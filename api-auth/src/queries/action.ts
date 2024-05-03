export const _getAll = `select id , code, description  from app.action where deletedat is null `;

export const _getById = `select id , code, description  from app.action  where id = ($1) and deletedat is null`;

export const _getByCode = `select id , code, description  from app.action  where code = ($1) and deletedat is null`;

export const _getByApplicationId = `select id , code, description  from app.action  where application_id  = ($1) and deletedat is null`;

export const _upsert = `INSERT INTO app.action (code, description, application_id, createdat, updatedat)
                        VALUES (($1), ($2), ($3), NOW(), NULL) 
                        ON CONFLICT (code) DO UPDATE
                        SET description = EXCLUDED.description,
                            application_id = EXCLUDED.application_id,
                            updatedat = CASE WHEN app.action.description IS DISTINCT FROM EXCLUDED.description OR app.action.application_id IS DISTINCT FROM EXCLUDED.application_id THEN NOW() ELSE app.action.updatedat END,
                            createdat = CASE WHEN app.action.code IS DISTINCT FROM EXCLUDED.code THEN NOW() ELSE app.action.createdat END;

                        `;

export const _deleteById = `UPDATE app.action 
                            SET deletedAt = NOW()
                            WHERE id = ($1)`;
