import pool from "../util/database";

const create: any = async (
  case_id: string,
  stage_id: string,
  user_id: string,
  message: string,
  type: string
) => {
  try {
    const result = await pool.query(
      `INSERT INTO app.casechat(case_id, stage_id, user_id, message, type)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [case_id, stage_id, user_id, message, type]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByCase: any = async (case_id: string) => {
  try {
    const result = await pool.query(
      `SELECT
        cc.id,
        cc.case_id,
        cc.stage_id,
        cc.user_id,
        cc.message,
        cc.created_at,
        cc.type,
        cc.user_id,
        i.name AS applicant_name,
        i.paternallastname AS applicant_lastname
      FROM app.casechat AS cc
      INNER JOIN app.case AS c ON c.id = cc.case_id
      INNER JOIN app.insured AS i ON i.id = c.insured_id
      WHERE cc.case_id = $1`,
      [case_id]
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getByCase };
