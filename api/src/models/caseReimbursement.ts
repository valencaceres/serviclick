import pool from "../util/database";

const create: any = async (
  case_id: string,
  casestageresult_id: string,
  user_id?: string,
  status?: "Pendiente" | "Aprobado" | "Rechazado"
) => {
  try {
    const caseStageReimbursment = await pool.query(
      `SELECT * FROM app.casereimbursment
      WHERE case_id = $1
      AND casestageresult_id = $2`,
      [case_id, casestageresult_id]
    );
    console.log(caseStageReimbursment.rows);

    if (caseStageReimbursment.rowCount > 0) {
      const result = await pool.query(
        `UPDATE app.casereimbursment
        SET user_id = $1,
            status = $2
        WHERE case_id = $3
        AND casestageresult_id = $4
        RETURNING *`,
        [user_id, status, case_id, casestageresult_id]
      );

      return { success: true, data: result.rows[0], error: null };
    }

    const result = await pool.query(
      `INSERT INTO app.casereimbursment(case_id, casestageresult_id, user_id, status)
        VALUES ($1, $2, $3, $4) RETURNING *`,
      [case_id, casestageresult_id, user_id, status]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create };
