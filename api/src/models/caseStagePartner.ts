import pool from "../util/database";

const create: any = async (
  case_id: string,
  stage_id: string,
  partner_id: string,
  scheduled_date?: string,
  scheduled_time?: string
) => {
  try {
    const caseStagePartner = await pool.query(
      `SELECT * FROM app.casestagepartner
      WHERE case_id = $1
      AND casestage_id = $2`,
      [case_id, stage_id]
    );

    if (caseStagePartner.rowCount > 0) {
      const result = await pool.query(
        `UPDATE app.casestagepartner
        SET scheduled_date = $1,
            scheduled_time = $2,
            partner_id = $3
        WHERE case_id = $4
        AND casestage_id = $5`,
        [scheduled_date, scheduled_time, partner_id, case_id, stage_id]
      );

      return { success: true, data: result.rows[0], error: null };
    }

    const result = await pool.query(
      `INSERT INTO app.casestagepartner(case_id, casestage_id, partner_id, scheduled_date, scheduled_time)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [case_id, stage_id, partner_id, scheduled_date, scheduled_time]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById = async (case_id: string, stage_id: string) => {
  try {
    const result = await pool.query(
      `SELECT * FROM app.casestagepartner
      WHERE case_id = $1
      AND casestage_id = $2`,
      [case_id, stage_id]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getById };
