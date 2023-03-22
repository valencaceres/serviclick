import pool from "../util/database";

import { _getBeneficiaryData } from "../queries/case";
import { IData } from "../interfaces/case";

const create: any = async (
  applicant: any,
  number?: string,
  product_id?: string,
  assistance_id?: string
) => {
  try {
    if (!product_id || !assistance_id) {
      const result = await pool.query(
        "INSERT INTO app.case(type, applicant_id) VALUES ($1, $2) RETURNING *",
        [applicant.type, applicant.id]
      );

      return { success: true, data: result.rows[0], error: null };
    }

    const resultCase = await pool.query(
      `SELECT * FROM app.case 
      WHERE number = $1 AND applicant_id = $2
      RETURNING *`,
      [number, applicant.id]
    );

    if (resultCase.rows.length > 0) {
      const result = await pool.query(
        `UPDATE app.case SET product_id = $1, assistance_id = $2
        WHERE number = $3 AND applicant_id = $4 RETURNING *`,
        [product_id, assistance_id, number, applicant.id]
      );

      return { success: true, data: result.rows[0], error: null };
    }

    return { success: false, data: null, error: "No se encontró el caso" };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll: any = async () => {
  try {
    const result = await pool.query(`
      SELECT cst.case_id,
      cas.number,
      sta.name as stage,
      prd.name as product,
      CASE 
        WHEN ins.name IS NOT NULL THEN ins.name 
        WHEN ben.name IS NOT NULL THEN ben.name 
        ELSE per.name 
        END as name,
        CASE 
            WHEN ins.paternallastname IS NOT NULL THEN ins.paternallastname 
            WHEN ben.paternallastname IS NOT NULL THEN ben.paternallastname 
            ELSE per.paternallastname 
        END as paternallastname
      FROM app.casestage cst
      INNER JOIN app.case cas ON cas.id = cst.case_id
      INNER JOIN app.stage sta ON sta.id = cst.stage_id
      left outer JOIN app.product prd ON prd.id = cas.product_id
      left outer JOIN app.assistance asi ON asi.id = cas.assistance_id
      LEFT OUTER JOIN app.beneficiary ben ON ben.id = cas.applicant_id
      LEFT OUTER JOIN app.insured ins ON ins.id = cas.applicant_id
      LEFT OUTER JOIN app.person per ON per.id = cas.applicant_id
    `);

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getBeneficiaryData: any = async (rut: string) => {
  try {
    const result = await pool.query(_getBeneficiaryData, [rut]);

    if (result.rows.length > 0) {
      const data: IData = {
        beneficiary: {
          type: result.rows[0].type,
          id: result.rows[0].id,
          rut: result.rows[0].rut,
          name: result.rows[0].name,
          paternallastname: result.rows[0].paternallastname,
          maternallastname: result.rows[0].maternallastname,
          address: result.rows[0].address,
          district: result.rows[0].district,
          email: result.rows[0].email,
          phone: result.rows[0].phone,
          birthdate: result.rows[0].birthdate,
        },
        products: result.rows.map((row: any) => ({
          id: row.product_id,
          name: row.product_name,
          assistance: {
            id: row.assistance_id,
            name: row.assistance_name,
            amount: row.assistance_amount,
            currency: row.assistance_currency,
            maximum: row.assistance_maximum,
            events: row.assistance_events,
            lack: row.assistance_lack,
          },
        })),
      };
      return { success: true, data, error: null };
    }

    return {
      success: true,
      data: null,
      error: "Beneficiary not found",
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getAll, getBeneficiaryData };
