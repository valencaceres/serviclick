import pool from "../util/database";

const create: any = async (
  case_id: string,
  stage_id: string,
  user_id: string,
  description?: string
) => {
  try {
    const caseStage = await pool.query(
      `SELECT * FROM app.casestage 
      WHERE case_id = $1 
      AND stage_id = $2 
      AND user_id = $3`,
      [case_id, stage_id, user_id]
    );

    if (caseStage.rowCount > 0) {
      const result = await pool.query(
        `UPDATE app.casestage
        SET description = $1
        WHERE case_id = $2
        AND stage_id = $3
        AND user_id = $4`,
        [description, case_id, stage_id, user_id]
      );

      return { success: true, data: result.rows[0], error: null };
    }

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
              AST.id AS assistance_id,
              CST.description, 
              PSN.name AS operator_name,
              CAS.applicant_id,
              FAM.id AS family_id,
              PSN.paternallastname AS operator_lastname,
              CASE WHEN INS.name IS NOT NULL THEN INS.name
              WHEN BEN.name IS NOT NULL THEN BEN.name
              ELSE PER.name END AS applicant_name,
              CASE WHEN INS.paternallastname IS NOT NULL THEN INS.paternallastname
              WHEN BEN.paternallastname IS NOT NULL THEN BEN.paternallastname
              ELSE PER.paternallastname END AS applicant_lastname,
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
      LEFT OUTER JOIN app.family FAM ON AST.family_id = FAM.id
      LEFT OUTER JOIN app.beneficiary BEN ON CAS.applicant_id = BEN.id
      LEFT OUTER JOIN app.insured INS ON CAS.applicant_id = INS.id
      LEFT OUTER JOIN app.person PER ON CAS.applicant_id = PER.id
      WHERE case_id = $1
      ORDER BY CST.createddate DESC`,
      [id]
    );

    const data = {
      case_id: result.rows[0].case_id,
      case_number: result.rows[0].case_number,
      product: result.rows[0].product,
      assistance: result.rows[0].assistance,
      assistance_id: result.rows[0].assistance_id,
      family_id: result.rows[0].family_id,
      rut: result.rows[0].rut,
      applicant_id: result.rows[0].applicant_id,
      applicant_name: result.rows[0].applicant_name,
      applicant_lastname: result.rows[0].applicant_lastname,
      stages: result.rows.map((row: any) => ({
        stage: row.stage,
        createddate: row.createddate,
        description: row.description,
        operator_name: row.operator_name,
        operator_lastname: row.operator_lastname,
      })),
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getById };
