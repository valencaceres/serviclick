export const _getAll = `select  act.id,
                                apt.id as application_id ,
                                apt."name" as application_name,
                                    act.code,
                                    act.description
                              from app.action act
                              inner join app.application apt on act.application_id = apt.id
                                  where act.deletedat is null 
                                  ORDER BY act.description `;

export const _getById = `select  act.id,
                          apt.id as application_id ,
                          apt."name" as application_name,
                              act.code,
                              act.description,
                              act.createdat,
                              act.updatedat
                        from app.action act
                        inner join app.application apt on act.application_id = apt.id
                            where act.id = ($1) and act.deletedat is null 
                            ORDER BY act.description `;

export const _getByCode = `select  act.id,
                            apt.id as application_id ,
                            apt."name" as application_name,
                                act.code,
                                act.description,
                                act.createdat,
                                act.updatedat
                          from app.action act
                          inner join app.application apt on act.application_id = apt.id
                              where act.code  = ($1) and act.deletedat is null 
                              ORDER BY act.description `;

export const _getByApplicationId = `select  act.id,
                                      apt.id as application_id ,
                                      apt."name" as application_name,
                                          act.code,
                                          act.description,
                                          act.createdat,
                                          act.updatedat
                                    from app.action act
                                    inner join app.application apt on act.application_id = apt.id
                                        where act.application_id = ($1) and act.deletedat is null 
                                        ORDER BY act.description `;

export const _upsert = `WITH inserted_action AS (
                          INSERT INTO app.action (code, description, application_id)
                          VALUES (($1), ($3), ($3)) 
                          ON CONFLICT (code)
                          DO UPDATE SET description = EXCLUDED.description, 
                                        application_id = EXCLUDED.application_id, 
                                        updatedat = now(), 
                                        deletedat = NULL
                          RETURNING id, application_id
                      )
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
                        `;

export const _deleteById = `UPDATE app.action 
                            SET deletedAt = NOW()
                            WHERE id = ($1)
                            RETURNING id, deletedat`;
