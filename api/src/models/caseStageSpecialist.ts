import pool from "../util/database";

const create: any = async (
  case_id: string,
  stage_id: string,
  specialist_id: string,
  district_id: string,
  scheduled_date?: string,
  scheduled_time?: string
) => {
  try {
    const caseStageSpecialist = await pool.query(
      `SELECT * FROM app.casestagespecialist
      WHERE case_id = $1
      AND casestage_id = $2`,
      [case_id, stage_id]
    );

    if (caseStageSpecialist.rowCount > 0) {
      const result = await pool.query(
        `UPDATE app.casestagespecialist
        SET scheduled_date = $1,
            scheduled_time = $2,
            specialist_id = $3,
            district_id = $4
        WHERE case_id = $5
        AND casestage_id = $6`,
        [
          scheduled_date,
          scheduled_time,
          specialist_id,
          district_id,
          case_id,
          stage_id,
        ]
      );

      return { success: true, data: result.rows[0], error: null };
    }

    const result = await pool.query(
      `INSERT INTO app.casestagespecialist(case_id, casestage_id, specialist_id, district_id, scheduled_date, scheduled_time)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        case_id,
        stage_id,
        specialist_id,
        district_id,
        scheduled_date,
        scheduled_time,
      ]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById = async (case_id: string, stage_id: string) => {
  try {
    const result = await pool.query(
      `SELECT * FROM app.casestagespecialist
      INNER JOIN app.specialist ON specialist.specialist_id = casestagespecialist.specialist_id
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
