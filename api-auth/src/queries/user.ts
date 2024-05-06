export const _getAll = `
                        SELECT 
                            usr.id, 
                            person_id,
                            per.rut as rut, 
                            per."name" as name ,
                            per.paternallastname as paternalLastName,
                            per.maternallastname as maternalLastName,
                            per.address as address,
                            COALESCE(dtc.district_name, per.district) as district_name,
                            email,
                            per.phone as phone
                        FROM 
                            app."user"  usr
                        INNER JOIN 
                            app.person per ON per.id = usr.person_id
                        LEFT JOIN 
                            app.district dtc ON per.district_id = dtc.id
                        WHERE 
                            usr.deletedat IS NULL;`;

export const _getById = `
                        SELECT 
                            usr.id, 
                            person_id,
                            per.rut as rut, 
                            per."name" as name ,
                            per.paternallastname as paternalLastName,
                            per.maternallastname as maternalLastName,
                            per.address as address,
                            COALESCE(dtc.district_name, per.district) as district_name,
                            email,
                            per.phone as phone,
                            array(
                            select 
                                jsonb_build_object(
                                    'id', rol.id,
                                    'code', rol.code,
                                    'name', rol.name
                                )
                            from app.user_rol url
                            	inner join app.rol rol on url.rol_id = rol.id
                                where 
                                user_id = usr.id
                            ) as roles,
                             usr.createdat,
                             usr.updatedat
                        FROM 
                            app."user"  usr
                        INNER JOIN 
                            app.person per ON per.id = usr.person_id
                        LEFT JOIN 
                            app.district dtc ON per.district_id = dtc.id
                        WHERE 
                            usr.deletedat IS null and usr.id = ($1)`;

export const _getByRut = `SELECT 
                            usr.id, 
                            person_id,
                            per.rut as rut, 
                            per."name" as name ,
                            per.paternallastname as paternalLastName,
                            per.maternallastname as maternalLastName,
                            per.address as address,
                            COALESCE(dtc.district_name, per.district) as district_name,
                            email,
                            per.phone as phone,
                            array(
                            select 
                                jsonb_build_object(
                                    'id', rol.id,
                                    'code', rol.code,
                                    'name', rol.name
                                )
                            from app.user_rol url
                            	inner join app.rol rol on url.rol_id = rol.id
                                where 
                                user_id = usr.id
                            ) as roles,
                             usr.createdat,
                             usr.updatedat
                        FROM 
                            app."user"  usr
                        INNER JOIN 
                            app.person per ON per.id = usr.person_id
                        LEFT JOIN 
                            app.district dtc ON per.district_id = dtc.id
                        WHERE 
                            usr.deletedat IS null and per.rut = ($1)`;

export const _upsert = `WITH person_data AS (
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
                            deletedat = null
                        RETURNING id, rut, "name", paternallastname, maternallastname, email, phone, address, birthdate, district_id
                    ), user_data AS (
                        INSERT INTO app.user (person_id, login)
                        SELECT id, email FROM person_data
                        ON CONFLICT (login)
                        DO UPDATE SET
                            deletedat = null,
                            updatedat = now()
                        RETURNING *
                    )
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
                            WHERE user_id = usr.id
                        ) AS roles,
                        usr.createdat,
                        usr.updatedat
                    FROM 
                        user_data usr
                    CROSS JOIN person_data AS per
                    INNER JOIN app.district dis ON dis.id = per.district_id;
`;

export const _deleteById = `UPDATE app.user 
                            SET deletedAt = NOW()
                            WHERE id = ($1)
                            RETURNING id, deletedat
                            `;

export const _updatePassword = `
                                UPDATE app.user
                                SET password = $1
                                WHERE id = $2
                                RETURNING id, updatedat 
`;

export const _validate = `SELECT 
                            usr.id, 
                            per.id AS "personId",
                                                per.rut as rut, 
                                                per."name" as name ,
                                                per.paternallastname as paternalLastName,
                                                per.maternallastname as maternalLastName,
                                                per.address as address,
                                                COALESCE(dis.district_name, per.district) as district_name,
                                                email,
                                                per.phone as phone,
                            array(
                                                select 
                                                    jsonb_build_object(
                                                        'id', rol.id,
                                                        'code', rol.code,
                                                        'name', rol.name
                                                    )
                                                from app.user_rol url
                                                    inner join app.rol rol on url.rol_id = rol.id
                                                    where 
                                                    user_id = usr.id
                                                ) as roles,
                                                usr.createdat,
                                                usr.updatedat,
                            usr.hash
                        FROM 
                            app.user usr
                        INNER JOIN 
                            app.person per ON usr.person_id = per.id
                        INNER JOIN
                            app.district dis ON per.district_id = dis.id
                        WHERE per.email = $1 AND usr.deletedat  IS NULL`;
