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

export const _upsert = ``;

export const _deleteById = `UPDATE app.user 
                            SET deletedAt = NOW()
                            WHERE id = ($1)
                            RETURNING id, deletedat
                            `;

export const _updatePassword = `
                                UPDATE app."user"
                                SET hash = ($1)
                                    updatedat = CASE 
                                                    WHEN hash IS DISTINCT FROM ($1) THEN NOW() 
                                                    ELSE updatedat 
                                                END
                                WHERE 
                                    id = ($2)
`;

export const _validate = ``;
