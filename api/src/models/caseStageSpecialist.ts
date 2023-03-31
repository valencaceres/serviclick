import pool from "../util/database";

const create: any = async (
  case_id: string,
  stage_id: string,
  specialist_id: string,
  district_id: string,
  scheduled_date?: string,
  scheduled_time?: string,
  confirmed_date?: string,
  confirmed_time?: string
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
            district_id = $4,
            confirmed_date = $5,
            confirmed_time = $6
        WHERE case_id = $7
        AND casestage_id = $8`,
        [
          scheduled_date,
          scheduled_time,
          specialist_id,
          district_id,
          confirmed_date,
          confirmed_time,
          case_id,
          stage_id,
        ]
      );

      return { success: true, data: result.rows[0], error: null };
    }

    const result = await pool.query(
      `INSERT INTO app.casestagespecialist(case_id, casestage_id, specialist_id, district_id)
        VALUES ($1, $2, $3, $4) RETURNING *`,
      [case_id, stage_id, specialist_id, district_id]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById = async (case_id: string, stage_id: string) => {
  try {
    const result = await pool.query(
      `SELECT 
        app.casestagespecialist.id,
        app.casestagespecialist.case_id,
        app.casestagespecialist.casestage_id,
        app.casestagespecialist.specialist_id,
        app.casestagespecialist.district_id,
        app.casestagespecialist.scheduled_date,
        app.casestagespecialist.scheduled_time,
        app.casestagespecialist.confirmed_date,
        app.casestagespecialist.confirmed_time,
        CONCAT(app.person.name, ' ', app.person.paternallastname) AS specialist_name
      FROM app.casestagespecialist
      INNER JOIN app.specialist ON specialist.person_id = casestagespecialist.specialist_id
      INNER JOIN app.person ON person.id = app.specialist.person_id
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
