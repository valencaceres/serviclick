import pool from "../util/database";

const createModel: any = async (
  createDate: string,
  customer_id: string,
  company_id: string
) => {
  try {
    const result = await pool.query(
      `
        INSERT  INTO app.lead(
                createdate,
                customer_id,
                company_id) 
        VALUES( $1, $2, $3) RETURNING *`,
      [createDate, customer_id, company_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const registerSubscriptionModel: any = async (
  id: string,
  subscription_id: number,
  completion_url: string,
  security_token: string,
  status_code: number
) => {
  try {
    const result = await pool.query(
      `
          UPDATE app.lead
          SET    subscription_id = $2,
                 completion_url = $3,
                 security_token = $4,
                 status_code = $5
          WHERE  id = $1 RETURNING *`,
      [id, subscription_id, completion_url, security_token, status_code]
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
                LEA.createdate,
                CUS.id AS customer_id,
                CASE WHEN CUS.rut IS NULL THEN '' ELSE CUS.rut END AS customer_rut,
                CASE WHEN CUS.name IS NULL THEN '' ELSE CUS.name END AS customer_name,
                CASE WHEN CUS.paternallastname IS NULL THEN '' ELSE CUS.paternallastname END AS customer_paternallastname,
                CASE WHEN CUS.maternallastname IS NULL THEN '' ELSE CUS.maternallastname END AS customer_maternallastname,
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
                LEA.completion_url,
                LEA.security_token,
                LEA.status_code,
                LEA.policy_id
        FROM    app.lead LEA LEFT OUTER JOIN app.customer CUS ON LEA.customer_id = CUS.id
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
              LEA.createdate,
              CUS.id AS customer_id,
              CASE WHEN CUS.rut IS NULL THEN '' ELSE CUS.rut END AS customer_rut,
              CASE WHEN CUS.name IS NULL THEN '' ELSE CUS.name END AS customer_name,
              CASE WHEN CUS.paternallastname IS NULL THEN '' ELSE CUS.paternallastname END AS customer_paternallastname,
              CASE WHEN CUS.maternallastname IS NULL THEN '' ELSE CUS.maternallastname END AS customer_maternallastname,
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
              LEA.completion_url,
              LEA.security_token,
              LEA.status_code,
              LEA.policy_id
        FROM    app.lead LEA LEFT OUTER JOIN app.customer CUS ON LEA.customer_id = CUS.id
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

export {
  createModel,
  registerSubscriptionModel,
  getById,
  getBySubscriptionId,
  getInsuredById,
};
