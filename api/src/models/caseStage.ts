import pool from "../util/database";

const create: any = async (
  case_id: string,
  stage_id: string,
  user_id: string,
  description?: string
) => {
  try {
    const result = await pool.query(
      `INSERT INTO app.casestage(case_id, stage_id, user_id, description)
        VALUES ($1, $2, $3, $4) RETURNING *`,
      [case_id, stage_id, user_id, description]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create };
