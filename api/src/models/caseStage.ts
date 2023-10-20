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
      AND stage_id = $2`,
      [case_id, stage_id]
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
              CST.id AS stage_id,
              STA.name AS stage, 
              CST.createddate AS createddate,
              CAS.number AS case_number, 
              PRD.name AS product, 
              PRD.id AS product_id,
              AST.name AS assistance, 
              AST.id AS assistance_id,
              CST.description, 
              CAS.insured_id,
              CAS.beneficiary_id,
              CAS.isactive,
              CAS.type,
              CAS.event_date,
              CAS.event_location,
              FAM.id AS family_id,
              CAS.lead_id,
              CST.user_id,
              COALESCE(CAS.retail_id, CAS.customer_id) AS contractor_id,
              CASE WHEN BEN.name IS NOT NULL THEN BEN.name
              WHEN INS.name IS NOT NULL THEN INS.name
              ELSE PER.name END AS applicant_name,
              CASE WHEN BEN.paternallastname IS NOT NULL THEN BEN.paternallastname
              WHEN INS.paternallastname IS NOT NULL THEN INS.paternallastname
              ELSE PER.paternallastname END AS applicant_lastname,
              CASE WHEN BEN.maternallastname IS NOT NULL THEN BEN.maternallastname
              WHEN INS.maternallastname IS NOT NULL THEN INS.maternallastname
              ELSE PER.maternallastname END AS applicant_maternallastname,
              CASE WHEN BEN.rut IS NOT NULL THEN BEN.rut
              WHEN INS.rut IS NOT NULL THEN INS.rut
              ELSE PER.rut END AS rut,
              CASE WHEN BEN.birthdate IS NOT NULL THEN BEN.birthdate
              WHEN INS.birthdate IS NOT NULL THEN INS.birthdate
              ELSE PER.birthdate END AS applicant_birthdate,
              CASE WHEN BEN.address IS NOT NULL THEN BEN.address
              WHEN INS.address IS NOT NULL THEN INS.address
              ELSE PER.address END AS address,
              CASE WHEN BEN.phone IS NOT NULL THEN BEN.phone
              WHEN INS.phone IS NOT NULL THEN INS.phone
              ELSE PER.phone END AS phone,
              CASE WHEN BEN.email IS NOT NULL THEN BEN.email
              WHEN INS.email IS NOT NULL THEN INS.email
              ELSE PER.email END AS email,
              CASE WHEN BEN.district IS NOT NULL THEN BEN.district
              WHEN INS.district IS NOT NULL THEN INS.district
              ELSE PER.district END AS district
      FROM app.casestage CST
      INNER JOIN app.stage STA ON CST.stage_id = STA.id
      INNER JOIN app.case CAS ON CST.case_id = CAS.id
      LEFT OUTER JOIN app.product PRD ON CAS.product_id = PRD.id
      LEFT OUTER JOIN app.assistance AST ON CAS.assistance_id = AST.id
      LEFT OUTER JOIN app.family FAM ON AST.family_id = FAM.id
      LEFT OUTER JOIN app.beneficiary BEN ON CAS.beneficiary_id = BEN.id
      LEFT OUTER JOIN app.insured INS ON CAS.insured_id = INS.id
      LEFT OUTER JOIN app.person PER ON CAS.insured_id = PER.id
      WHERE case_id = $1
      ORDER BY CST.createddate DESC`,
      [id]
    );

    const data = {
      case_id: result.rows[0].case_id,
      case_number: result.rows[0].case_number,
      product: result.rows[0].product,
      product_id: result.rows[0].product_id,
      assistance: result.rows[0].assistance,
      assistance_id: result.rows[0].assistance_id,
      family_id: result.rows[0].family_id,
      rut: result.rows[0].rut,
      description: result.rows[0].description,
      birthdate: result.rows[0].applicant_birthdate,
      insured_id: result.rows[0].insured_id,
      applicant_name: result.rows[0].applicant_name,
      applicant_lastname: result.rows[0].applicant_lastname,
      applicant_maternallastname: result.rows[0].applicant_maternallastname,
      applicant_address: result.rows[0].address,
      applicant_phone: result.rows[0].phone,
      applicant_email: result.rows[0].email,
      applicant_district: result.rows[0].district,
      beneficiary_id: result.rows[0].beneficiary_id,
      contractor_id: result.rows[0].contractor_id,
      type: result.rows[0].type,
      is_active: result.rows[0].isactive,
      lead_id: result.rows[0].lead_id,
      event_date: result.rows[0].event_date,
      event_location: result.rows[0].event_location,
      stages: result.rows.map((row: any) => ({
        id: row.stage_id,
        stage: row.stage,
        createddate: row.createddate,
        description: row.description,
        user_id: row.user_id,
      })),
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getById };
