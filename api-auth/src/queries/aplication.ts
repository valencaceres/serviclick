export const _getAll = `select  id, 
                                code, 
                                name  
                        from app.application 
                        where deletedat is null`;

export const _getById = `select id,
                                code, 
                                name,
                                createdat,
                                updatedat
                        from app.application  
                        where id = ($1) and deletedat is null`;

export const _getByCode = `select id,
                                code, 
                                name,
                                createdat,
                                updatedat
                        from app.application  
                        where code = ($1) and deletedat is null`;

export const _upsert = `INSERT INTO app.application (code, "name")
                        VALUES (($1), ($2))
                        ON CONFLICT (code) 
                        DO UPDATE SET name = ($2),updatedat = now(), deletedat = null
                        returning
                        id,
                        code,
                        name,
                        createdat,
                        updatedata
`;

export const _deleteById = `UPDATE app.application 
                            SET deletedAt = NOW()
                            WHERE id = ($1)
                            RETURNING id, deletedat`;
