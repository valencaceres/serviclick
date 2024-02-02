import pool from "../util/database";

import {
  _getById,
  _getAll,
  _getBeneficiaryData,
  _getApplicantByRut,
  _getServicesAndValues,
  _upsert,
  _getRetails,
  _getOrigins,
  _getStatus,
  _getReimbursment,
  _getAllExports
} from "../queries/case";
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
          retail_id = $3,
          customer_id = $4,
          event_date = $6,
          event_location = $7
          WHERE ${
            applicant.type === "B" || isInsured === false
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
        `INSERT INTO app.case(type, ${
          applicant.type === "B" || isInsured === false
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
      WHERE number = $1 AND ${
        applicant.type === "B" || isInsured === false
          ? "beneficiary_id"
          : "insured_id"
      } = $2`,
      [number, applicant.id]
    );

    if (resultCase.rows.length > 0) {
      const result = await pool.query(
        `UPDATE app.case SET product_id = $1, assistance_id = $2, isactive = $3, retail_id = $4, customer_id = $5, lead_id = $6, event_date = $9, event_location = $10
        WHERE number = $7 AND ${
          applicant.type === "B" || isInsured === false
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

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(_getById, [id]);
    return { success: true, data: result.rows[0].case_get_by_id, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll: any = async (
  retail_id: string,
  applicant_rut: string,
  applicant_name: string,
  stage_id: string,
  records: number,
  page: number
) => {
  try {
    const result = await pool.query(_getAll, [
      retail_id,
      applicant_rut,
      applicant_name,
      stage_id,
      records,
      page,
    ]);
    return {
      success: true,
      data: result.rows[0].case_get_all || [],
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};



const getAllExports: any = async (
  retail_id: string,
  case_date: string,
  event_date: string,
  records: number,
  page: number,
  isExport: boolean

) => {
  try {
    const result = await pool.query(_getAllExports, [
      retail_id,
      case_date,
      event_date,
      records,
      page,
      isExport
    ]);
    return {
      success: true,
      data: result.rows[0].case_get_report || [],
      error: null,
    };
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
const getCaseDates = async () => {
  try {
    const caseDatesResult = await pool.query('SELECT * FROM app.case_get_dates()');
    
    const {  createdDates, eventDates } = caseDatesResult.rows[0].get_case_dates;
    return { success: true, data:{createdDates, eventDates}, error: null };

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

const createCaseSummary: any = async (
  case_id: string,
  amount: string,
  extraamount?: string,
  comment?: string
) => {
  try {
    const caseReimbursement = await pool.query(
      `SELECT amount FROM app.casereimbursment
      WHERE case_id = $1`,
      [case_id]
    );
    let amountReimbursment;
    if (caseReimbursement.rowCount > 0) {
      const reimbursementAmount = caseReimbursement.rows[0].amount;

      amountReimbursment = String(Number(amount) - reimbursementAmount);

      await pool.query(
        `UPDATE app.casereimbursment
        SET amount = 0
        WHERE case_id = $1`,
        [case_id]
      );
    }

    const caseSummary = await pool.query(
      `SELECT * FROM app.casesummary
      WHERE case_id = $1`,
      [case_id]
    );

    let updatedCaseSummary;

    if (caseSummary.rowCount > 0) {
      const result = await pool.query(
        `UPDATE app.casesummary
        SET amount = $1,
        extraamount = $2,
        comment = $3
        WHERE case_id = $4
        RETURNING *`,
        [amount, extraamount, comment, case_id]
      );

      updatedCaseSummary = result.rows[0];
    } else {
      const result = await pool.query(
        `INSERT INTO app.casesummary(case_id, amount, extraamount, comment)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [case_id, amount, extraamount, comment]
      );

      updatedCaseSummary = result.rows[0];
    }

    const caseStageResult = await pool.query(
      `SELECT amount, available FROM app.casestageresult
      WHERE case_id = $1`,
      [case_id]
    );

    if (caseStageResult.rowCount > 0 && amountReimbursment !== undefined) {
      const { amount: casestageresult_amount, available } =
        caseStageResult.rows[0];

      const newAvailable =
        available -
        Number(amountReimbursment) * -1 -
        updatedCaseSummary.amount -
        updatedCaseSummary.extraamount;

      await pool.query(
        `UPDATE app.casestageresult
        SET available = $1
        WHERE case_id = $2`,
        [newAvailable, case_id]
      );

      return { success: true, data: updatedCaseSummary, error: null };
    }

    return {
      success: false,
      data: null,
      error: "case id not found",
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getApplicantByRut: any = async (rut: string) => {
  try {
    const caseApplicant = await pool.query(_getApplicantByRut, [rut]);
    return {
      success: true,
      data: caseApplicant.rows[0].case_get_applicant_by_rut,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getServicesAndValues: any = async (
  insured_id: string,
  beneficiary_id: string,
  retail_id: string,
  customer_id: string,
  product_id: string,
  assistance_id: string
) => {
  try {
    const caseServices = await pool.query(_getServicesAndValues, [
      insured_id,
      beneficiary_id,
      retail_id,
      customer_id,
      product_id,
      assistance_id,
    ]);
    return {
      success: true,
      data: caseServices.rows[0].case_get_services_and_values,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const upsert: any = async (
  case_id: string,
  user_id: string,
  type: string,
  insured_id: string,
  beneficiary_id: string,
  customer_id: string,
  retail_id: string,
  product_id: string,
  assistance_id: string,
  lead_id: string,
  values: { id: string; value: string }[],
  event: { date: string; district: string; description: string },
  files: { document_id: string; file_tag: string }[],
  procedure_id: string,
  refund_amount: number,
  specialist: {
    specialist_id: string;
    specialty_id: string;
    district_id: string;
    scheduled_date: string;
    scheduled_time: string;
    confirmed: boolean;
    completed: boolean;
    cancel: boolean;
    qualification_id: string;
    comment: string;
  },
  alliance: {
    partner_id: string;
    specialty_id: string;
    scheduled_date: string;
    scheduled_time: string;
    confirmed: boolean;
    completed: boolean;
    cancel: boolean;
    qualification_id: string;
    comment: string;
  },
  cost: { fixed: number; extra: number },
  status: {
    description: string;
    isClosed: boolean;
  },
  productplan_id: string
) => {
  try {
    const caseUpsert = await pool.query(_upsert, [
      case_id,
      user_id,
      type,
      insured_id,
      beneficiary_id,
      customer_id,
      retail_id,
      product_id,
      assistance_id,
      lead_id,
      values,
      event,
      files,
      procedure_id,
      refund_amount,
      specialist,
      alliance,
      cost,
      status,
      productplan_id,
    ]);

    return {
      success: true,
      data: caseUpsert.rows[0].case_upsert,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getRetails: any = async () => {
  try {
    const result = await pool.query(_getRetails);

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getOrigins: any = async () => {
  try {
    const result = await pool.query(_getOrigins);

    return { success: true, data: result.rows[0].case_get_origins, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
}


const getStatus = async () => {
  try {
    const result = await pool.query(_getStatus);

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getReimbursment: any = async (
  isImed: boolean,
  applicant_rut: string,
  applicant_name: string,
  records: number,
  page: number
) => {
  try {
    const result = await pool.query(_getReimbursment, [
      isImed,
      applicant_rut,
      applicant_name,
      records,
      page,
    ]);

    return {
      success: true,
      data: result.rows[0].case_get_reimbursment || [],
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateReimbursment = async (
  id: string,
  status: string,
  user_id: string,
  imed_amount: number | null,
  amount: number | null,
  comment: string | null
) => {
  try {
    const query = `
      UPDATE app.casereimbursment
      SET
        status = $2,
        user_id = $3,
        imed_amount = $4,
        amount = $5,
        comment = $6
      WHERE
        id = $1
      RETURNING *;
    `;

    const result = await pool.query(query, [
      id,
      status,
      user_id,
      imed_amount,
      amount,
      comment,
    ]);

    return {
      success: true,
      data: result.rows,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export {
  create,
  getById,
  getAll,
  getBeneficiaryData,
  getNewCaseNumber,
  getAssistanceData,
  discountAssistanceData,
  getMonthlyCases,
  getCasesReimbursment,
  getTotalCases,
  createCaseSummary,
  getApplicantByRut,
  getServicesAndValues,
  getAllExports,
  upsert,
  getRetails,
  getStatus,
  getOrigins,
  updateReimbursment,
  getReimbursment,
  getCaseDates
};
