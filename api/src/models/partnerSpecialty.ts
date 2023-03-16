import pool from "../util/database";

const create: any = async (partner_id: string, specialty_id: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.partnerspecialty(partner_id, specialty_id) VALUES ($1, $2) RETURNING *",
      [partner_id, specialty_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByPartnerId: any = async (partner_id: string) => {
  try {
    const specialtiesResponse = await pool.query(
      `SELECT SPE.id,
              SPE.name,
              FAM.id as family_id,
              FAM.name as family_name
        FROM app.partnerspecialty PS
        INNER JOIN app.specialty SPE ON SPE.id = PS.specialty_id
        INNER JOIN app.family FAM ON FAM.id = SPE.family_id
        WHERE PS.partner_id = $1`,
      [partner_id]
    );
    console.log(specialtiesResponse.rows);

    return { success: true, data: specialtiesResponse.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteByPartnerId: any = async (id: string) => {
  try {
    const result = await pool.query(
      "DELETE FROM app.partnerspecialty WHERE partner_id = $1 RETURNING *",
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getByPartnerId, deleteByPartnerId };
