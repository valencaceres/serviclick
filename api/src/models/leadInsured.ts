import pool from "../util/database";

const createModel: any = async (lead_id: string, insured_id: string) => {
  try {
    const result = await pool.query(
      `
        INSERT  INTO app.leadinsured(
                lead_id,
                insured_id) 
        VALUES( $1, $2) RETURNING *`,
      [lead_id, insured_id]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByLeadId: any = async (lead_id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  INS.id,
                INS.rut,
                INS.name,
                INS.paternallastname,
                INS.maternallastname,
                INS.address,
                INS.district,
                INS.email,
                INS.phone
        FROM    app.leadinsured LEA INNER JOIN app.insured INS ON LEA.insured_id = INS.id
        WHERE   LEA.lead_id = $1`,
      [lead_id]
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createModel, getByLeadId };
