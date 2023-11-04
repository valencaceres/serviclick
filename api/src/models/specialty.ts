import pool from "../util/database";

const createSpecialty: any = async (family_id: string, name: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.specialty(name, family_id) VALUES ($1, $2) RETURNING *",
      [name, family_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateSpecialty: any = async (
  id: string,
  family_id: string,
  name: string
) => {
  try {
    const result = await pool.query(
      "UPDATE app.specialty SET name = $1, family_id = $2 WHERE id = $3 RETURNING *",
      [name, family_id, id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteSpecialty: any = async (id: string) => {
  try {
    const result = await pool.query(
      "UPDATE app.specialty SET isActive = false WHERE id = $1 RETURNING *",
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getSpecialty: any = async (specialty_id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  spe.id,
                spe.name,
                fam.id as family_id,
                fam.name as family_name
        FROM    app.specialty spe 
                    inner join app.family fam on spe.family_id = fam.id
        WHERE   spe.id = $1`,
      [specialty_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAllSpecialties: any = async () => {
  try {
    const result = await pool.query(`
    SELECT  spe.id,
            spe.name,
            fam.id as family_id,
            fam.name as family_name
    FROM    app.specialty spe 
                inner join app.family fam on spe.family_id = fam.id
    WHERE   spe.isactive is true
    ORDER   BY
            fam.name,
            spe.name`);
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getSpecialtiesByFamilyId: any = async (family_id: string) => {
  try {
    const result = await pool.query(
      `
      SELECT  spe.id,
              spe.name,
              fam.id as family_id,
              fam.name as family_name
      FROM    app.specialty spe 
                  inner join app.family fam on spe.family_id = fam.id
      WHERE   spe.isactive is true AND
              spe.family_id = $1
      ORDER   BY
              fam.name,
              spe.name`,
      [family_id]
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getSpecialitiesByAssistance: any = async (
  id: string,
  assistance_id: string
) => {
  try {
    const result = await pool.query(
      `
    select 	distinct
            spy.id as specialty_id,
            spy.name as specialty_name
    from 	  app.specialist spe
              inner join app.specialistspecialty ssp on spe.id = ssp.specialist_id
              inner join app.assistancespecialty asp on ssp.specialty_id = asp.specialty_id
              inner join app.specialty spy on ssp.specialty_id = spy.id
    where 	spe.id = $1 and
            asp.assistance_id = $2
    order  	by 
            spy.name`,
      [id, assistance_id]
    );

    const data =
      result.rows.length > 0
        ? result.rows.map((item: any) => {
            const { specialty_id, specialty_name } = item;
            return {
              specialty_id,
              specialty_name,
            };
          })
        : [];

    return {
      success: true,
      data,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getSpecialitiesByPartner: any = async (
  id: string,
  assistance_id: string
) => {
  try {
    const result = await pool.query(
      `
    select 	distinct
            spy.id as specialty_id,
            spy.name as specialty_name
    from 	  app.partner par
              inner join app.partnerspecialty psp on par.id = psp.partner_id
              inner join app.assistancespecialty asp on psp.specialty_id = asp.specialty_id
              inner join app.specialty spy on psp.specialty_id = spy.id
    where 	par.id = $1 and
            asp.assistance_id = $2
    order  	by 
            spy.name`,
      [id, assistance_id]
    );

    const data =
      result.rows.length > 0
        ? result.rows.map((item: any) => {
            const { specialty_id, specialty_name } = item;
            return {
              specialty_id,
              specialty_name,
            };
          })
        : [];

    return {
      success: true,
      data,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getFamilies: any = async (values: any) => {
  try {
    const result = await pool.query(`
      SELECT  distinct
              fam.id as family_id,
              fam.name as family_name
      FROM    app.specialty spe 
                  inner join app.family fam on spe.family_id = fam.id
      WHERE   spe.isactive is true
      ORDER   BY
              fam.name`);
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export {
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
  getSpecialty,
  getAllSpecialties,
  getSpecialtiesByFamilyId,
  getFamilies,
  getSpecialitiesByAssistance,
  getSpecialitiesByPartner,
};
