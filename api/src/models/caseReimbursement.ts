import pool from "../util/database";

const create: any = async (
  case_id: string,
  casestageresult_id: string,
  user_id?: string,
  amount?: string,
  status?: "Pendiente" | "Aprobado" | "Rechazado",
  imed_amount?: number
) => {
  try {
    const caseStageReimbursment = await pool.query(
      `SELECT * FROM app.casereimbursment
      WHERE case_id = $1
      AND casestageresult_id = $2`,
      [case_id, casestageresult_id]
    );

    if (
      caseStageReimbursment &&
      caseStageReimbursment.rowCount &&
      caseStageReimbursment.rowCount > 0
    ) {
      const result = await pool.query(
        `UPDATE app.casereimbursment
        SET user_id = $1,
            status = $2,
            imed_amount = $5,
            amount= $6
        WHERE case_id = $3
        AND casestageresult_id = $4
        RETURNING *`,
        [user_id, status, case_id, casestageresult_id, imed_amount, amount]
      );

      return { success: true, data: result.rows[0], error: null };
    }

    const result = await pool.query(
      `INSERT INTO app.casereimbursment(case_id, casestageresult_id, user_id, status, imed_amount, amount)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [case_id, casestageresult_id, user_id, status, imed_amount, amount]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll: any = async () => {
  try {
    const result = await pool.query(`SELECT
                                        sub.id,
                                        sub.status,
                                        sub.amount,
                                        sub.currency,
                                        sub.uf_value,
                                        sub.available,
                                        sub.name,
                                        sub.paternallastname,
                                        sub.maternallastname,
                                        sub.assistance,
                                        sub.max_amount,
                                        SUB.maximum,
                                        sub.case_id,
                                        sub.case_number,
                                        sub.stage_name,
                                        sub.casestageresult_id
                                    FROM (
                                        SELECT
                                            CR.id,
                                            CR.status,
                                            CSR.amount,
                                            CSR.currency,
                                            CSR.uf_value,
                                            CSR.available,
                                            CSR.id AS casestageresult_id,
                                            I.name,
                                            I.paternallastname,
                                            I.maternallastname,
                                            A.name AS assistance,
                                            PA.amount AS max_amount,
                                            PA.maximum AS maximum,
                                            C.id AS case_id,
                                            C.number AS case_number,
                                            S.name AS stage_name,
                                            ROW_NUMBER() OVER (PARTITION BY C.id ORDER BY S.number DESC) AS row_number
                                        FROM app.casereimbursment AS CR
                                        INNER JOIN app.casestageresult AS CSR ON CR.casestageresult_id = CSR.id
                                        INNER JOIN app.casestage AS CS ON CSR.casestage_id = CS.id
                                        INNER JOIN app.case AS C ON CS.case_id = C.id
                                        INNER JOIN app.product AS P ON C.product_id = P.id
                                        INNER JOIN app.assistance AS A ON C.assistance_id = A.id
                                        INNER JOIN app.productassistance AS PA ON P.id = PA.product_id AND A.id = PA.assistance_id
                                        INNER JOIN app.insured AS I ON C.insured_id = I.id
                                        INNER JOIN app.stage AS S ON CS.stage_id = S.id
                                    ) sub
                                    WHERE sub.row_number = 1
                                  `);

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateStatus: any = async (
  case_id: string,
  casestageresult_id: string,
  status: "Pendiente" | "Aprobado" | "Rechazado"
) => {
  try {
    const result = await pool.query(
      `UPDATE app.casereimbursment
      SET status = $1
      WHERE case_id = $2
      AND casestageresult_id = $3
      RETURNING *`,
      [status, case_id, casestageresult_id]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getAll, updateStatus };
