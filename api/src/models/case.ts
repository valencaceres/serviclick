import pool from "../util/database";

import { _getBeneficiaryData } from "../queries/case";
import { IData } from "../interfaces/case";

const create: any = async (
  applicant: any,
  number?: number,
  product_id?: string,
  assistance_id?: string,
  isactive?: boolean,
  isInsured?: boolean,
  company_id?: string,
  customer_id?: string,
  beneficiary_id?: string
) => {
  try {
    if (!product_id || !assistance_id) {
      if (beneficiary_id) {
        const exists = await pool.query(
          `SELECT * FROM app.case WHERE beneficiary_id = $1 AND number = $2`,
          [beneficiary_id, number]
        );

        if (exists.rows.length > 0) {
          const result = await pool.query(
            `UPDATE app.case SET insured_id = $1, company_id = $2, customer_id = $3 WHERE beneficiary_id = $4 AND number = $5 RETURNING *`,
            [applicant.id, company_id, customer_id, beneficiary_id, number]
          );

          return { success: true, data: result.rows[0], error: null };
        }

        const result = await pool.query(
          `INSERT INTO app.case (number, insured_id, beneficiary_id, company_id, customer_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [number, applicant.id, beneficiary_id, company_id, customer_id]
        );

        return { success: true, data: result.rows[0], error: null };
      }
      const exists = await pool.query(
        `SELECT * FROM app.case WHERE ${
          applicant.type === "B" || isInsured === false
            ? "beneficiary_id"
            : "insured_id"
        } = $1 AND number = $2`,
        [applicant.id, number]
      );

      if (exists.rows.length > 0) {
        const result = await pool.query(
          `UPDATE app.case SET type = $1, ${
            applicant.type === "B" || isInsured === false
              ? "beneficiary_id"
              : "insured_id"
          } = $2,
          company_id = $3,
          customer_id = $4
          WHERE ${
            applicant.type === "B" || isInsured === false
              ? "beneficiary_id"
              : "insured_id"
          } = $2 AND number = $5 RETURNING *`,
          [applicant.type, applicant.id, company_id, customer_id, number]
        );

        return { success: true, data: result.rows[0], error: null };
      }
      const result = await pool.query(
        `INSERT INTO app.case(type, ${
          applicant.type === "B" || isInsured === false
            ? "beneficiary_id"
            : "insured_id"
        }, company_id, customer_id) VALUES ($1, $2, $3, $4) RETURNING *`,
        [applicant.type, applicant.id, company_id, customer_id]
      );

      return { success: true, data: result.rows[0], error: null };
    }

    const resultCase = await pool.query(
      `SELECT * FROM app.case 
      WHERE number = $1 AND ${
        applicant.type === "B" || isInsured === false
          ? "beneficiary_id"
          : "insured_id"
      } = $2`,
      [number, applicant.id]
    );

    if (resultCase.rows.length > 0) {
      const result = await pool.query(
        `UPDATE app.case SET product_id = $1, assistance_id = $2, isactive = $3, company_id = $4, customer_id = $5
        WHERE number = $6 AND ${
          applicant.type === "B" || isInsured === false
            ? "beneficiary_id"
            : "insured_id"
        } = $7
        RETURNING *`,
        [
          product_id,
          assistance_id,
          isactive,
          company_id,
          customer_id,
          number,
          applicant.id,
        ]
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
        WHEN ben.name IS NOT NULL THEN ben.name 
        WHEN ins.name IS NOT NULL THEN ins.name 
        ELSE per.name 
        END as name,
        CASE 
            WHEN ben.paternallastname IS NOT NULL THEN ben.paternallastname 
            WHEN ins.paternallastname IS NOT NULL THEN ins.paternallastname 
            ELSE per.paternallastname 
        END as paternallastname
        FROM app.casestage cst
        INNER JOIN (
          SELECT case_id, MAX(sta.number) AS max_number
          FROM app.casestage cst
          INNER JOIN app.stage sta ON cst.stage_id = sta.id
          GROUP BY case_id
        ) latest_stages ON cst.case_id = latest_stages.case_id
        INNER JOIN app.stage sta ON cst.stage_id = sta.id AND sta.number = latest_stages.max_number
        INNER JOIN app.case cas ON cas.id = cst.case_id
        LEFT OUTER JOIN app.product prd ON prd.id = cas.product_id
        LEFT OUTER JOIN app.assistance asi ON asi.id = cas.assistance_id
        LEFT OUTER JOIN app.beneficiary ben ON ben.id = cas.beneficiary_id
        LEFT OUTER JOIN app.insured ins ON ins.id = cas.insured_id
        LEFT OUTER JOIN app.person per ON per.id = cas.insured_id
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
        customer_id: result.rows[0].customer_id,
        company_id: result.rows[0].company_id,
        insured: {
          type: "I",
          id: result.rows[0].insured_id,
          rut: result.rows[0].insured_rut,
          name: result.rows[0].insured_name,
          paternallastname: result.rows[0].insured_paternallastname,
          maternallastname: result.rows[0].insured_maternallastname,
          address: result.rows[0].insured_address,
          district: result.rows[0].insured_district,
          email: result.rows[0].insured_email,
          phone: result.rows[0].insured_phone,
          birthdate: result.rows[0].insured_birthdate,
        },
        beneficiary: {
          type: "B",
          id: result.rows[0].beneficiary_id,
          rut: result.rows[0].beneficiary_rut,
          name: result.rows[0].beneficiary_name,
          paternallastname: result.rows[0].beneficiary_paternallastname,
          maternallastname: result.rows[0].beneficiary_maternallastname,
          address: result.rows[0].beneficiary_address,
          district: result.rows[0].beneficiary_district,
          email: result.rows[0].beneficiary_email,
          phone: result.rows[0].beneficiary_phone,
          birthdate: result.rows[0].beneficiary_birthdate,
        },
        products: result.rows.map((row: any) => ({
          lead_id: row.lead_id,
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
            family_id: row.family_id,
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

const getNewCaseNumber = async () => {
  try {
    const result = await pool.query(`SELECT MAX(number) FROM app.case`);

    return { success: true, data: result.rows[0].max + 1, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAssistanceData: any = async (
  insured_id: string,
  assistance_id: string,
  product_id: string
) => {
  try {
    const result = await pool.query(
      `select     asi.id,
            max(asi.name) as assistance_name,
            max(pas.amount) as max_amount,
            max(pas.currency) as currency,
            max(pas.maximum) as maximum,
            max(pas.events) as max_events,
            sum(case when csr.amount is null or (crm.status <> 'Pendiente' and crm.status <> 'Aprobado') then 0 else csr.amount end) as used_amount,
            sum(case when csr.amount > 0 and (crm.status = 'Pendiente' or crm.status = 'Aprobado') then 1 else 0 end) as used_events
      from     app.case cas
                left outer join app.casestage cst ON cst.case_id = cas.id
                left outer join app.casestageresult csr on cst.id = csr.casestage_id
                left outer join app.casereimbursment crm on csr.id = crm.casestageresult_id
                inner join app.assistance asi ON cas.assistance_id = asi.id
                inner join app.productassistance pas ON asi.id = pas.assistance_id
                inner join app.product pro on pas.product_id = pro.id and cas.product_id = pro.id
      where     cas.insured_id = $1
            and cas.assistance_id = $2
            and cas.product_id = $3
      group     by
            asi.id`,
      [insured_id, assistance_id, product_id]
    );

    if (result.rows.length > 0) {
      const remainingAmount = result.rows[0].max_amount
        ? result.rows[0].max_amount - result.rows[0].used_amount
        : 0;
      const remainingEvents =
        result.rows[0].max_events > 0
          ? result.rows[0].max_events - result.rows[0].used_events
          : 0;

      const data = {
        id: result.rows[0].id,
        name: result.rows[0].assistance_name,
        max_amount: result.rows[0].max_amount,
        currency: result.rows[0].currency,
        maximum: result.rows[0].maximum,
        max_events: result.rows[0].max_events,
        remaining_amount: remainingAmount,
        remaining_events: remainingEvents,
        used_amount: result.rows[0].used_amount,
        used_events: result.rows[0].used_events,
      };
      return { success: true, data, error: null };
    } else {
      return {
        success: true,
        data: null,
        error: "Assistance not found",
      };
    }
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export {
  create,
  getAll,
  getBeneficiaryData,
  getNewCaseNumber,
  getAssistanceData,
};
