import { format } from "date-fns";

import pool from "../util/database";

const createModel: any = async (
  id: string,
  customer_id: string,
  company_id: string,
  agent_id: string,
  link: string = "",
  subscription_id?: string,
  policy_id?: string,
  paymenttype_code?: string,
  user_id?: string
) => {
  try {
    const createDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    let result;

    if (id === "") {
      result = await pool.query(
        `
          INSERT  INTO app.lead(
                  createdate,
                  customer_id,
                  company_id,
                  agent_id,
                  link,
                  subscription_id,
                  policy_id,
                  paymenttype_code,
                  user_id)
          VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          createDate,
          customer_id === "" ? null : customer_id,
          company_id === "" ? null : company_id,
          agent_id,
          link,
          subscription_id,
          policy_id,
          paymenttype_code,
          user_id,
        ]
      );
    } else {
      result = await pool.query(
        `
          UPDATE  app.lead
          SET     createdate = $1,
                  customer_id = $2,
                  company_id = $3,
                  link = $5,
                  subscription_id = $6,
                  policy_id = $7,
                  paymenttype_code = $8,
                  user_id = $9
          WHERE   id = $4 RETURNING *`,
        [
          createDate,
          customer_id === "" ? null : customer_id,
          company_id === "" ? null : company_id,
          id,
          link,
          subscription_id,
          policy_id,
          paymenttype_code,
          user_id,
        ]
      );
    }

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updatePaymentTypeCode: any = async (
  id: string,
  paymentTypeCode: string
) => {
  try {
    const result = await pool.query(
      `
          UPDATE  app.lead
          SET     paymenttype_code = $2
          WHERE   id = $1 RETURNING *`,
      [id, paymentTypeCode]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const registerSubscriptionModel: any = async (
  id: string,
  subscription_id: number
) => {
  try {
    const result = await pool.query(
      `
          UPDATE app.lead
          SET    subscription_id = $2,
                 paymenttype_code = 'C'
          WHERE  id = $1 RETURNING *`,
      [id, subscription_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  DISTINCT
                LEA.id,
                LEA.agent_id,
                LEA.createdate,
                CASE WHEN POL.id is null THEN '' ELSE POL.id :: text END as policy_id,
                CASE WHEN POL.number is null THEN 0 ELSE POL.number END as policy_number,
                CASE WHEN POL.createdate is null THEN '' ELSE POL.createdate :: text END as policy_createdate,
                CASE WHEN POL.startdate is null THEN '' ELSE POL.startdate :: text END as policy_startdate,
                CUS.id AS customer_id,
                CASE WHEN CUS.rut IS NULL THEN '' ELSE CUS.rut END AS customer_rut,
                CASE WHEN CUS.name IS NULL THEN '' ELSE CUS.name END AS customer_name,
                CASE WHEN CUS.paternallastname IS NULL THEN '' ELSE CUS.paternallastname END AS customer_paternallastname,
                CASE WHEN CUS.maternallastname IS NULL THEN '' ELSE CUS.maternallastname END AS customer_maternallastname,
                to_char(CUS.birthdate, 'YYYY-MM-DD') AS customer_birthdate,
                CASE WHEN CUS.address IS NULL THEN '' ELSE CUS.address END AS customer_address,
                CASE WHEN CUS.district IS NULL THEN '' ELSE CUS.district END AS customer_district,
                CASE WHEN CUS.email IS NULL THEN '' ELSE CUS.email END AS customer_email,
                CASE WHEN CUS.phone IS NULL THEN '' ELSE CUS.phone END AS customer_phone,
                COM.id AS company_id,
                CASE WHEN COM.rut IS NULL THEN '' ELSE COM.rut END AS company_rut,
                CASE WHEN COM.companyname IS NULL THEN '' ELSE COM.companyname END AS company_companyname,
                CASE WHEN COM.legalrepresentative IS NULL THEN '' ELSE COM.legalrepresentative END AS company_legalrepresentative,
                CASE WHEN COM.line IS NULL THEN '' ELSE COM.line END AS company_line,
                CASE WHEN COM.address IS NULL THEN '' ELSE COM.address END AS company_address,
                CASE WHEN COM.district IS NULL THEN '' ELSE COM.district END AS company_district,
                CASE WHEN COM.email IS NULL THEN '' ELSE COM.email END AS company_email,
                CASE WHEN COM.phone IS NULL THEN '' ELSE COM.phone END AS company_phone,
                LEA.subscription_id,
                CASE WHEN LEA.link IS NULL THEN '' ELSE LEA.link END AS link
        FROM    app.lead LEA
                  LEFT OUTER JOIN app.policy POL on LEA.policy_id = POL.id
                  LEFT OUTER JOIN app.customer CUS ON LEA.customer_id = CUS.id
                  LEFT OUTER JOIN app.company COM ON LEA.company_id = COM.id
        WHERE   LEA.id = $1`,
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getBySubscriptionId: any = async (subscription_id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  DISTINCT
                LEA.id,
                LEA.agent_id,
                LEA.createdate,
                CASE WHEN POL.id is null THEN '' ELSE POL.id :: text END as policy_id,
                CASE WHEN POL.number is null THEN 0 ELSE POL.number END as policy_number,
                CASE WHEN POL.createdate is null THEN '' ELSE POL.createdate :: text END as policy_createdate,
                CASE WHEN POL.startdate is null THEN '' ELSE POL.startdate :: text END as policy_startdate,
                CUS.id AS customer_id,
                CASE WHEN CUS.rut IS NULL THEN '' ELSE CUS.rut END AS customer_rut,
                CASE WHEN CUS.name IS NULL THEN '' ELSE CUS.name END AS customer_name,
                CASE WHEN CUS.paternallastname IS NULL THEN '' ELSE CUS.paternallastname END AS customer_paternallastname,
                CASE WHEN CUS.maternallastname IS NULL THEN '' ELSE CUS.maternallastname END AS customer_maternallastname,
                to_char(CUS.birthdate, 'YYYY-MM-DD') AS customer_birthdate,
                CASE WHEN CUS.address IS NULL THEN '' ELSE CUS.address END AS customer_address,
                CASE WHEN CUS.district IS NULL THEN '' ELSE CUS.district END AS customer_district,
                CASE WHEN CUS.email IS NULL THEN '' ELSE CUS.email END AS customer_email,
                CASE WHEN CUS.phone IS NULL THEN '' ELSE CUS.phone END AS customer_phone,
                COM.id AS company_id,
                CASE WHEN COM.rut IS NULL THEN '' ELSE COM.rut END AS company_rut,
                CASE WHEN COM.companyname IS NULL THEN '' ELSE COM.companyname END AS company_companyname,
                CASE WHEN COM.legalrepresentative IS NULL THEN '' ELSE COM.legalrepresentative END AS company_legalrepresentative,
                CASE WHEN COM.line IS NULL THEN '' ELSE COM.line END AS company_line,
                CASE WHEN COM.address IS NULL THEN '' ELSE COM.address END AS company_address,
                CASE WHEN COM.district IS NULL THEN '' ELSE COM.district END AS company_district,
                CASE WHEN COM.email IS NULL THEN '' ELSE COM.email END AS company_email,
                CASE WHEN COM.phone IS NULL THEN '' ELSE COM.phone END AS company_phone,
                LEA.subscription_id,
                CASE WHEN LEA.link IS NULL THEN '' ELSE LEA.link END AS link
        FROM    app.lead LEA 
                  LEFT OUTER JOIN app.policy POL on LEA.policy_id = POL.id
                  LEFT OUTER JOIN app.customer CUS ON LEA.customer_id = CUS.id
                  LEFT OUTER JOIN app.company COM ON LEA.company_id = COM.id
        WHERE   LEA.subscription_id = $1`,
      [subscription_id]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getInsuredById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  INR.id,
                INR.rut,
                INR.name,
                INR.paternallastname,
                INR.maternallastname,
                to_char(INR.birthdate, 'YYYY-MM-DD') as birthdate,
                INR.address,
                INR.district,
                INR.email,
                INR.phone
        FROM    app.leadInsured LEA INNER JOIN app.insured INR ON LEA.insured_id = INR.id
        WHERE   LEA.lead_id = $1`,
      [id]
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getProductsById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  product_id,
                price,
                currency_code,
                frequency_code
        FROM    app.leadProduct
        WHERE   lead_id = $1`,
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateSubscription: any = async (
  lead_id: string,
  subscription_id: number
) => {
  try {
    const result = await pool.query(
      `
        UPDATE  app.lead
        SET     subscription_id = $1,
                paymenttype_code = 'C'
        WHERE   id = $2 RETURNING *`,
      [subscription_id, lead_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getMonthlySubscriptions: any = async () => {
  try {
    const result = await pool.query(
      `select    extract(YEAR FROM lea.createdate) as year,
              extract(MONTH FROM lea.createdate) as month,
              count(1) as subscriptions,
              sum(ppl.price) as monthly_collection
        from    app.lead lea
                  inner join app.leadproduct lpr on lea.id = lpr.lead_id
                  inner join app.productplan ppl on lpr.product_id = ppl.product_id and ppl.agent_id = lea.agent_id and type = 'customer'
        where    not policy_id is null
        group     by
              extract(YEAR FROM lea.createdate),
              extract(MONTH FROM lea.createdate)
        order     by
              extract(YEAR FROM lea.createdate) desc,
              extract(MONTH FROM lea.createdate) desc
        `
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export {
  createModel,
  updatePaymentTypeCode,
  registerSubscriptionModel,
  getById,
  getBySubscriptionId,
  getInsuredById,
  getProductsById,
  updateSubscription,
  getMonthlySubscriptions
};
