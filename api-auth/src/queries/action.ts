export const _getAll = `select id , code, description  from app.action where deletedat is null `;

export const _getById = `select id , code, description  from app.action  where id = ($1) and deletedat is null`;

export const _getByCode = `select id , code, description  from app.action  where code = ($1) and deletedat is null`;

export const _getByApplicationId = ``;

export const _upsert = `INSERT INTO app.action (code, description, createdat, updatedat)
                        VALUES (($1), ($2), now(), now())
                        ON CONFLICT (code) DO UPDATE
                        SET description = excluded.description, updatedat = excluded.updatedat;`;

export const _deleteById = `UPDATE app.action 
                            SET deletedAt = NOW()
                            WHERE id = ($1)`;
