import pool from "../util/database";

const create: any = async (
  case_id: string,
  stage_id: string,
  user_id: string,
  description?: string
) => {
  try {
    const result = await pool.query(
      `INSERT INTO app.casestage(case_id, stage_id, user_id, description)
        VALUES ($1, $2, $3, $4) RETURNING *`,
      [case_id, stage_id, user_id, description]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById = async (id: string) => {
  try {
    const result = await pool.query(
      `SELECT CST.case_id,
              STA.name AS stage, 
              CST.createddate AS createddate,
              CAS.number AS case_number, 
              PRD.name AS product, 
              AST.name AS assistance, 
              CST.description, 
              PSN.name AS operator_name,
              CAS.applicant_id,
              PSN.paternallastname AS operator_lastname,
              CASE WHEN INS.rut IS NOT NULL THEN INS.rut
              WHEN BEN.rut IS NOT NULL THEN BEN.rut
              ELSE PER.rut END AS rut
      FROM app.casestage CST
      INNER JOIN app.stage STA ON CST.stage_id = STA.id
      INNER JOIN app.case CAS ON CST.case_id = CAS.id
      INNER JOIN app.user USR ON CST.user_id = USR.id
      INNER JOIN app.person PSN ON USR.person_id = PSN.id
      LEFT OUTER JOIN app.product PRD ON CAS.product_id = PRD.id
      LEFT OUTER JOIN app.assistance AST ON CAS.assistance_id = AST.id
      LEFT OUTER JOIN app.beneficiary BEN ON CAS.applicant_id = BEN.id
      LEFT OUTER JOIN app.insured INS ON CAS.applicant_id = INS.id
      LEFT OUTER JOIN app.person PER ON CAS.applicant_id = PER.id
      WHERE case_id = $1`,
      [id]
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getById };
