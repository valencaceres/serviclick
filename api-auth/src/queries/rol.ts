export const _getAll = `select id , code, name  from app.rol where deletedat is null `;

export const _getById = `select id , code, name  from app.rol  where id = ($1) and deletedat is null`;

export const _upsert = `INSERT INTO app.rol (code, name, createdat, updatedat)
                        VALUES (($1), ($2), now(), now())
                        ON CONFLICT (code) DO UPDATE
                        SET name = excluded.name, updatedat = excluded.updatedat;`;

export const _deleteById = `UPDATE app.rol 
                            SET deletedAt = NOW()
                            WHERE id = ($1)`;
