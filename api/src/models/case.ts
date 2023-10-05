import pool from "../util/database";

import { _getBeneficiaryData } from "../queries/case";
import { IData } from "../interfaces/case";

interface IApplicant {
  id: string;
  type: string;
}

const create: any = async (
  applicant: IApplicant,
  number?: number,
  product_id?: string,
  assistance_id?: string,
  isactive?: boolean,
  isInsured?: boolean,
  retail_id?: string,
  customer_id?: string,
  beneficiary_id?: string,
  lead_id?: string,
  event_date?: Date,
  event_location?: string
) => {
  try {
    if (!product_id && !assistance_id) {
      if (beneficiary_id) {
        const exists = await pool.query(
          `SELECT * FROM app.case WHERE beneficiary_id = $1 AND number = $2`,
          [beneficiary_id, number]
        );

        if (exists.rows.length > 0) {
          const result = await pool.query(
            `UPDATE app.case SET insured_id = $1, retail_id = $2, customer_id = $3, event_date = $6, event_location = $7 WHERE beneficiary_id = $4 AND number = $5 RETURNING *`,
            [
              applicant.id,
              retail_id,
              customer_id,
              beneficiary_id,
              number,
              event_date,
              event_location,
            ]
          );

          return { success: true, data: result.rows[0], error: null };
        }

        const result = await pool.query(
          `INSERT INTO app.case (insured_id, beneficiary_id, retail_id, customer_id, type, event_date, event_location) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
          [
            applicant.id,
            beneficiary_id,
            retail_id,
            customer_id,
            applicant.type,
            event_date,
            event_location,
          ]
        );

        return { success: true, data: result.rows[0], error: null };
      }
      const exists = await pool.query(
        `SELECT * FROM app.case WHERE ${applicant.type === "B" || isInsured === false
          ? "beneficiary_id"
          : "insured_id"
        } = $1 AND number = $2`,
        [applicant.id, number]
      );

      if (exists.rows.length > 0) {
        const result = await pool.query(
          `UPDATE app.case SET type = $1, ${applicant.type === "B" || isInsured === false
            ? "beneficiary_id"
            : "insured_id"
          } = $2,
          retail_id = $3,
          customer_id = $4,
          event_date = $6,
          event_location = $7
          WHERE ${applicant.type === "B" || isInsured === false
            ? "beneficiary_id"
            : "insured_id"
          } = $2 AND number = $5 RETURNING *`,
          [
            applicant.type,
            applicant.id,
            retail_id,
            customer_id,
            number,
            event_date,
            event_location,
          ]
        );

        return { success: true, data: result.rows[0], error: null };
      }
      const result = await pool.query(
        `INSERT INTO app.case(type, ${applicant.type === "B" || isInsured === false
          ? "beneficiary_id"
          : "insured_id"
        }, retail_id, customer_id, event_date, event_location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
          applicant.type,
          applicant.id,
          retail_id,
          customer_id,
          event_date,
          event_location,
        ]
      );

      return { success: true, data: result.rows[0], error: null };
    }

    const resultCase = await pool.query(
      `SELECT * FROM app.case 
      WHERE number = $1 AND ${applicant.type === "B" || isInsured === false
        ? "beneficiary_id"
        : "insured_id"
      } = $2`,
      [number, applicant.id]
    );

    if (resultCase.rows.length > 0) {
      const result = await pool.query(
        `UPDATE app.case SET product_id = $1, assistance_id = $2, isactive = $3, retail_id = $4, customer_id = $5, lead_id = $6, event_date = $9, event_location = $10
        WHERE number = $7 AND ${applicant.type === "B" || isInsured === false
          ? "beneficiary_id"
          : "insured_id"
        } = $8
        RETURNING *`,
        [
          product_id,
          assistance_id,
          isactive,
          retail_id,
          customer_id,
          lead_id,
          number,
          applicant.id,
          event_date,
          event_location,
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
        cas.createddate,
        sta.name as stage,
        prd.name as product,
        asi.name as assistance,
        CASE 
          WHEN ben.name IS NOT NULL THEN ben.name 
          WHEN ins.name IS NOT NULL THEN ins.name 
          ELSE per.name 
          END as name,
        CASE 
          WHEN ben.paternallastname IS NOT NULL THEN ben.paternallastname 
          WHEN ins.paternallastname IS NOT NULL THEN ins.paternallastname 
          ELSE per.paternallastname 
          END as lastname,
        CASE 
          WHEN ben.rut IS NOT NULL THEN ben.rut 
          WHEN ins.rut IS NOT NULL THEN ins.rut 
          ELSE per.rut 
          END as rut,
        CASE
          WHEN r.name IS NOT NULL THEN r.name 
          ELSE CONCAT_WS(' ', cust.name, cust.paternallastname)
        END as contractor_name
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
    LEFT OUTER JOIN app.retail r ON r.id = cas.retail_id 
    LEFT OUTER JOIN app.customer cust ON cust.id = cas.customer_id
    ORDER BY cas.number desc
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
        retail_id: result.rows[0].retail_id,
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
          relationship: result.rows[0].beneficiary_relationship,
        },
        products: result.rows.map((row: any) => ({
          lead_id: row.lead_id,
          id: row.product_id,
          name: row.product_name,
          created_at: row.createdate,
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
    const { rows } = await pool.query(
      `select asi.id,
            max(asi.name) as assistance_name,
            max(pas.amount) as max_amount,
            max(pas.currency) as currency,
            max(pas.maximum) as maximum,
            max(pas.events) as max_events,
            sum(case when csr.amount is null or (crm.status <> 'Pendiente' and crm.status <> 'Aprobado') then 0 else csr.amount end) as requested_amount,
            sum(case when crm.amount is null or (crm.status <> 'Pendiente' and crm.status <> 'Aprobado') then 0 else crm.amount end) as used_amount,
            sum(case when crm.imed_amount is null or (crm.status <> 'Pendiente' and crm.status <> 'Aprobado') then 0 else crm.imed_amount end) as imed_amount,
            sum(case when csr.amount > 0 and (crm.status = 'Pendiente' or crm.status = 'Aprobado') then 1 else 0 end) as used_events
      from app.case cas
            left join app.casestage cst ON cst.case_id = cas.id
            left join app.casestageresult csr on cst.id = csr.casestage_id
            left join app.casereimbursment crm on csr.id = crm.casestageresult_id
            inner join app.assistance asi ON cas.assistance_id = asi.id
            inner join app.productassistance pas ON asi.id = pas.assistance_id
            inner join app.product pro on pas.product_id = pro.id and cas.product_id = pro.id
      where cas.insured_id = $1
            and cas.assistance_id = $2
            and cas.product_id = $3
      group by asi.id`,
      [insured_id, assistance_id, product_id]
    );

    if (rows.length > 0) {
      const {
        id,
        assistance_name,
        max_amount,
        currency,
        maximum,
        max_events,
        used_amount,
        used_events,
        imed_amount,
      } = rows[0];

      const remainingAmount = max_amount ? max_amount - used_amount : 0;
      const remainingEvents = max_events > 0 ? max_events - used_events : 0;

      const data = {
        id,
        name: assistance_name,
        max_amount,
        currency,
        maximum,
        max_events,
        remaining_amount: remainingAmount,
        remaining_events: remainingEvents,
        used_amount,
        used_events,
        imed_amount,
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

const discountAssistanceData = async (
  insured_id: string,
  assistance_id: string,
  product_id: string
): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    // Obtener el valor actual de used_events y remaining_events
    const result = await pool.query(
      `UPDATE app.productassistance pa
       SET 
          events = events - 1

       FROM ( 
           SELECT pas.id,
                  max(pas.events) as max_events,
                  sum(case when csr.amount > 0 and (crm.status = 'Pendiente' or crm.status = 'Aprobado') then 1 else 0 end) as used_events
           FROM app.case cas
               LEFT JOIN app.casestage cst ON cst.case_id = cas.id
               LEFT JOIN app.casestageresult csr ON cst.id = csr.casestage_id
               LEFT JOIN app.casereimbursment crm ON csr.id = crm.casestageresult_id
               INNER JOIN app.assistance asi ON cas.assistance_id = asi.id
               INNER JOIN app.productassistance pas ON asi.id = pas.assistance_id
               INNER JOIN app.product pro ON pas.product_id = pro.id and cas.product_id = pro.id
           WHERE cas.insured_id = $1
               AND cas.assistance_id = $2
               AND cas.product_id = $3
           GROUP BY pas.id
       ) AS subquery
       WHERE pa.id = subquery.id
       RETURNING *`,
      [insured_id, assistance_id, product_id]
    );

    console.log(result.rows);

    if (result.rows.length > 0) {
      return {
        success: true,
        message: "Event discounted successfully",
      };
    } else {
      return {
        success: false,
        error: "No events available to discount",
      };
    }
  } catch (e) {
    return {
      success: false,
      error: (e as Error).message,
    };
  }
};

const getMonthlyCases: any = async () => {
  try {
    const monthNames = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];

    const result = await pool.query(
      `SELECT
      EXTRACT(YEAR FROM cas.createddate) AS year,
      EXTRACT(MONTH FROM cas.createddate) AS month,
      COUNT(1) AS total_cases,
      COUNT(CASE WHEN cas.isactive = true THEN 1 END) AS active_cases,
      COUNT(CASE WHEN cas.isactive = false THEN 1 END) AS inactive_cases
  FROM
      app.case cas
  GROUP BY
      EXTRACT(YEAR FROM cas.createddate),
      EXTRACT(MONTH FROM cas.createddate)
  ORDER BY
      EXTRACT(YEAR FROM cas.createddate) ASC,
      EXTRACT(MONTH FROM cas.createddate) ASC;
      `
    );

    let data = result.rows.map((item) => {
      const monthYear = `${monthNames[item.month - 1]}, ${item.year}`;
      return {
        monthYear: monthYear,
        cases: parseInt(item.total_cases),
        activeCases: parseInt(item.active_cases),
        inactiveCases: parseInt(item.inactive_cases),
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};
const getCasesReimbursment: any = async () => {
  try {
    const monthNames = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];

    const result = await pool.query(
      `SELECT
      EXTRACT(YEAR FROM cas.createddate) AS year,
      EXTRACT(MONTH FROM cas.createddate) AS month,
      COUNT(reimb.id) AS total_reimbursements,
      SUM(COALESCE(reimb.amount, 0) + COALESCE(reimb.imed_amount, 0)) AS total_reimbursement_amount
    FROM
      app.casereimbursment reimb
      INNER JOIN app.case cas ON reimb.case_id = cas.id
    GROUP BY
      EXTRACT(YEAR FROM cas.createddate),
      EXTRACT(MONTH FROM cas.createddate)
    ORDER BY
      EXTRACT(YEAR FROM cas.createddate) ASC,
      EXTRACT(MONTH FROM cas.createddate) ASC;
        `
    );

    let data = result.rows.map((item) => {
      const monthYear = `${monthNames[item.month - 1]}, ${item.year}`;
      return {
        monthYear: monthYear,
        totalReimbursments: parseInt(item.total_reimbursements),
        totalReimbursmentsAmount: parseInt(item.total_reimbursement_amount),
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getTotalCases: any = async () => {
  try {
    const result = await pool.query(
      `SELECT
      COUNT(1) AS total_cases,
      COUNT(CASE WHEN cas.isactive = true THEN 1 END) AS active_cases,
      COUNT(CASE WHEN cas.isactive = false THEN 1 END) AS inactive_cases
  FROM
      app.case cas;
        `
    );

    let data = result.rows.map((item) => {
      return {
        totalCases: parseInt(item.total_cases),
        totalInactiveCases: parseInt(item.inactive_cases),
        totalActiveCases: parseInt(item.active_cases),
      };
    });
    return { success: true, data, error: null };
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
  discountAssistanceData,
  getMonthlyCases,
  getCasesReimbursment,
  getTotalCases,
};
