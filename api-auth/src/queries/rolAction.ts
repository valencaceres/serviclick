export const _assignAction = `WITH updated_rol_action AS (
                                INSERT INTO app.rol_action (rol_id, action_id)
                                VALUES (($1)), ($2))
                                ON CONFLICT (rol_id, action_id) 
                                DO UPDATE SET createdat = now(), deletedat  = null
                                RETURNING *
                            )
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
                                            rol_id = rol.id
                                    ) AS actions, 
                                rol.createdat, 
                                rol.updatedat
                            FROM app.rol  rol
                            INNER JOIN app.rol_action rac ON rol.id = rac.rol_id
                            INNER JOIN app.action act ON rac.action_id = act.id
                            WHERE rol.id = ($1) )`;

export const _removeAction = `WITH updated_rol_action AS (
                                UPDATE app.rol_action 
                                SET deletedat = Now()
                                WHERE rol_id = ($1)
                                AND action_id = ($2)
                                RETURNING *
                                )
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
                                                rol_id = rol.id
                                        ) AS actions, 
                                    rol.createdat, 
                                    rol.updatedat
                                FROM app.rol  rol
                                INNER JOIN app.rol_action rac ON rol.id = rac.rol_id
                                INNER JOIN app.action act ON rac.action_id = act.id
                                WHERE rol.id = ($1) )`