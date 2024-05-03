export const _assignAction = `INSERT INTO app.rol_action (rol_id, action_id, createdAt)
                              VALUES (($1), ($2), NOW())
                              ON CONFLICT (rol_id, action_id)
                              DO UPDATE SET createdAt = EXCLUDED.createdAt;`;

export const _removeAction = `UPDATE app.rol_action
                              SET deletedAt = NOW()
                              WHERE id = ($1);`;
