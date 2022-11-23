import pool from "../util/database";

const create: any = async (assistance_id: string, description: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.assistanceexclusion(assistance_id, description) VALUES ($1, $2) RETURNING *",
      [assistance_id, description]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateById: any = async (
  id: string,
  assistance_id: string,
  description: string
) => {
  try {
    const result = await pool.query(
      "UPDATE app.assistanceexclusion SET assistance_id = $2, description = $3 WHERE id = $1 RETURNING *",
      [id, assistance_id, description]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteByAssistanceId: any = async (id: string) => {
  try {
    const result = await pool.query(
      "DELETE FROM app.assistanceexclusion WHERE assistance_id = $1 RETURNING *",
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteById: any = async (id: string) => {
  try {
    const result = await pool.query(
      "UPDATE app.assistanceexclusion SET isActive = false WHERE id = $1 RETURNING *",
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByAssistanceId: any = async (assistanceExclusion_id: string) => {
  try {
    const result = await pool.query(
      `select id,
              description
       from   app.assistanceexclusion
       where  assistance_id = $1`,
      [assistanceExclusion_id]
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export {
  create,
  updateById,
  deleteByAssistanceId,
  deleteById,
  getByAssistanceId,
};
