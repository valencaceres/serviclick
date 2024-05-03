export const _getAll = `select id , code, name  from app.application where deletedat is null`;

export const _getById = `select id , code, name  from app.application  where id = ($1) and deletedat is null`;

export const _getByCode = `select id , code, name  from app.application  where code = ($1) and deletedat is null`;

export const _upsert = `INSERT INTO app.application (code, "name", createdat, updatedat)
                        VALUES (($1), ($2), NOW(), NOW())
                        ON CONFLICT (code) DO UPDATE
                        SET "name" = CASE WHEN app.application.name <> EXCLUDED.name THEN EXCLUDED.name ELSE app.application.name END,
                            updatedat = CASE WHEN app.application.name <> EXCLUDED.name THEN EXCLUDED.updatedat ELSE app.application.updatedat END;

`;

export const _deleteById = `UPDATE app.application 
                            SET deletedAt = NOW()
                            WHERE id = ($1)`;
