import pool from "../util/database";

const create: any = async (
  case_id: string,
  casestage_id: string,
  amount: number,
  currency: "P" | "U"
) => {
  try {
    const caseStageResult = await pool.query(
      `SELECT * FROM app.casestageresult
      WHERE case_id = $1
      AND casestage_id = $2`,
      [case_id, casestage_id]
    );

    if (caseStageResult.rowCount > 0) {
      const result = await pool.query(
        `UPDATE app.casestageresult
        SET amount = $1,
            currency = $2
        WHERE case_id = $3
        AND casestage_id = $4`,
        [amount, currency, case_id, casestage_id]
      );

      return { success: true, data: result.rows[0], error: null };
    }

    const result = await pool.query(
      `INSERT INTO app.casestageresult(case_id, casestage_id, amount, currency)
        VALUES ($1, $2, $3, $4) RETURNING *`,
      [case_id, casestage_id, amount, currency]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAvailableAmounts = async (
  applicant_id: string,
  assistance_id: string
) => {
  try {
    const result = await pool.query(
      `SELECT
          CSR.case_id,
          CSR.casestage_id,
          (PA.amount - COALESCE(SUM(CSR.amount), 0)) AS amount_available,
          (PA.events - COALESCE(SUM(CSR.events), 0)) AS events_available
      FROM 
          app.case C
          INNER JOIN app.casestageresult CSR ON C.id = CSR.case_id
          INNER JOIN app.casestage CS ON CSR.casestage_id = CS.id
          INNER JOIN app.assistance A ON CS.assistance_id = A.id
          INNER JOIN app.productassistance PA ON A.id = PA.assistance_id
      WHERE 
          C.applicant_id = $1
          AND A.id = $2
      GROUP BY 
          CSR.case_id,
          CSR.casestage_id,
          A.amount,
          PA.events`,
      [applicant_id, assistance_id]
    );
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create };
