import pool from "../util/database";

const create: any = async (
  case_id: string,
  casestage_id: string,
  amount: number,
  currency: "P" | "U",
  uf_value: number,
  available: number
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
        AND casestage_id = $4
        RETURNING *`,
        [amount, currency, case_id, casestage_id]
      );

      return { success: true, data: result.rows[0], error: null };
    }

    const result = await pool.query(
      `INSERT INTO app.casestageresult(case_id, casestage_id, amount, currency, uf_value, available)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [case_id, casestage_id, amount, currency, uf_value, available]
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
        csr.id,
        csr.amount,
        csr.currency,
        csr.uf_value,
        csr.case_id,
        csr.casestage_id,
        cr.imed_amount,
        cr.amount as serviclick_amount,
        cr.comment,
        cr.status
      FROM app.casestageresult AS csr
      INNER JOIN app.casereimbursment AS cr ON cr.casestageresult_id = csr.id
      WHERE csr.case_id = $1`,
      [case_id]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getByCase };
