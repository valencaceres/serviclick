export const _getAll = `select  id , code, name  
                        from app.rol 
                        where deletedat is null 
                        ORDER BY name `;

export const _getById = `  SELECT 
rol.id,
rol.code,
rol.name,
ARRAY(
    SELECT 
        jsonb_build_object(
            'id', act.id,
            'application_id', apt.id,
            'application_name', apt.name,
            'code', act.code,
            'description', act.description
        )
    FROM 
        app.rol_action rac
        INNER JOIN app."action" act ON rac.action_id = act.id
        INNER JOIN app.application apt ON act.application_id = apt.id
    WHERE 
        rac.rol_id = rol.id
) AS actions,
rol.createdat,
rol.updatedat
FROM 
app.rol 
INNER JOIN app.user_rol ur ON ur.rol_id = rol.id
WHERE 
ur.user_id = $1 
AND rol.deletedat IS NULL;`;

export const _upsert = `INSERT INTO app.rol (code, name)
                        VALUES (($1), ($2))
                        ON CONFLICT (code)
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
                                updatedat`;

export const _deleteById = `UPDATE app.rol 
                            SET deletedAt = NOW()
                            WHERE id = ($1)
                            RETURNING id, deletedat`;
