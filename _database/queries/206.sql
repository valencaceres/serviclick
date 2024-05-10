/* create user */

INSERT INTO app.person (rut, "name", paternallastname, maternallastname, email, phone, address, birthdate, district_id) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
ON CONFLICT (rut)
DO UPDATE SET 
    "name" = $2, 
    paternallastname = $3, 
    maternallastname = $4, 
    email = $5, 
    phone = $6, 
    address = $7, 
    birthdate = $8,
    district_id = $9,
    updatedat = COALESCE(EXCLUDED.updatedat, now()),
    deletedat = null;

INSERT INTO app.user (person_id, login)
SELECT p.id, p.email
FROM app.person p
WHERE p.rut = $1
ON CONFLICT (login)
DO UPDATE SET
    deletedat = null,
    updatedat = now();

SELECT 
    usr.id,
    usr.person_id AS "personId",
    per.rut,
    per.name,
    per.paternallastname AS "paternalLastName",
    per.maternallastname AS "maternalLastName",
    per.address,
    per.birthdate,
    dis.district_name AS "districtName",
    per.email,
    per.phone,
    array(
        SELECT 
            jsonb_build_object(
                'id', rol.id,
                'code', rol.code,
                'name', rol.name
            )
        FROM app.user_rol url
        INNER JOIN app.rol rol ON url.rol_id = rol.id
        WHERE url.user_id = usr.id
    ) AS roles,
    usr.createdat,
    usr.updatedat
FROM 
    app.user usr
INNER JOIN 
    app.person per ON usr.person_id = per.id
INNER JOIN 
    app.district dis ON dis.id = per.district_id
WHERE 
    per.rut = $1;

/* update password */

UPDATE app.user
                                SET hash = $1
                                WHERE id = $2
                                RETURNING id, updatedat 


/* create application  */

INSERT INTO app.application (code, "name")
                        VALUES (($1), ($2))
                        ON CONFLICT (code) 
                        DO UPDATE SET name = ($2),updatedat = now(), deletedat = null
                        returning
                        id,
                        code,
                        name,
                        createdat,
                        updatedata


/* create action */

INSERT INTO app.action (code, description, application_id)
VALUES ($1, $3, $3) 
ON CONFLICT (code)
DO UPDATE SET 
    description = EXCLUDED.description, 
    application_id = EXCLUDED.application_id, 
    updatedat = now(), 
    deletedat = NULL;

SELECT 
    ia.id AS action_id,
    ia.application_id AS application_id,
    apt.name AS application_name,
    act.code,
    act.description,
    act.createdat,
    act.updatedat
FROM 
    inserted_action ia
JOIN 
    app.action act ON ia.id = act.id
JOIN 
    app.application apt ON ia.application_id = apt.id;
                        

/* create rol */

INSERT INTO app.rol (code, name)
                        VALUES (($1), ($2))
                        ON CONFLICT (code) DO update
                        DO UPDATE SET name = ($2),updatedat = now(), deletedat = null
                        RETURNING 
                        id,
                        code, 
                        name,
                        array(
                            select 
                                jsonb_build_object(
                                    'id', act.id,
                                    'application_id', apt.id,
                                    'application_name', apt.name,
                                    'code', act.code,
                                    'description', act.description
                                )
                            from app.rol_action rac
                                inner join app."action" act on rac.action_id = act.id
                                inner join app.application apt on act.application_id = apt.id
                                where 
                                rol_id = rol.id
                            ) as actions,
                                createdat,
                                updatedat


/* assign action  */

INSERT INTO app.rol_action (rol_id, action_id)
VALUES ($1, $2)
ON CONFLICT (rol_id, action_id) 
DO UPDATE SET createdat = now(), deletedat = null
RETURNING *;

SELECT 
    rol.id,
    rol.code, 
    rol.name,
    ARRAY(
        SELECT 
            json_build_object(
                'id', act.id,
                'code', act.code,
                'description', act.description
            )
        FROM 
            app.rol_action rac
        INNER JOIN app.action act ON rac.action_id = act.id 
        WHERE 
            rac.rol_id = rol.id
    ) AS actions, 
    rol.createdat, 
    rol.updatedat
FROM 
    app.rol rol
INNER JOIN 
    app.rol_action rac ON rol.id = rac.rol_id
INNER JOIN 
    app.action act ON rac.action_id = act.id
WHERE 
    rol.id = $1;


/* assign rol to user */

INSERT INTO app.user_rol (user_id, rol_id) 
VALUES ($1, $2) 
ON CONFLICT (user_id, rol_id) DO UPDATE SET deletedat = null;

SELECT 
    usr.id, 
    usr.person_id AS person_id,
    per.rut AS rut, 
    per."name" AS name,
    per.paternallastname AS paternalLastName,
    per.maternallastname AS maternalLastName,
    per.address AS address,
    COALESCE(dtc.district_name, per.district) AS district_name,
    per.email,
    per.phone AS phone,
    array(
        SELECT 
            jsonb_build_object(
                'id', rol.id,
                'code', rol.code,
                'name', rol.name
            )
        FROM 
            app.user_rol url
        INNER JOIN 
            app.rol rol ON url.rol_id = rol.id
        WHERE 
            url.user_id = usr.id
    ) AS roles,
    usr.createdat,
    usr.updatedat
FROM 
    app."user" usr
INNER JOIN 
    app.person per ON per.id = usr.person_id
LEFT JOIN 
    app.district dtc ON per.district_id = dtc.id
WHERE 
    usr.id = $1 AND 
    usr.deletedat IS NULL;