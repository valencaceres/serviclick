import pool from "../util/database";

const deleteByLeadId: any = async (lead_id: string, insured_id: string) => {
  try {
    const result = await pool.query(
      `DELETE FROM app.leadbeneficiary WHERE lead_id = $1 AND insured_id = $2`,
      [lead_id, insured_id]
    );

    return { success: true, data: "Beneficiaries deleted", error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const createModel: any = async (
  lead_id: string,
  insured_id: string,
  beneficiary_id: string
) => {
  try {
    const result = await pool.query(
      `
        INSERT  INTO app.leadbeneficiary(
                lead_id,
                insured_id,
                beneficiary_id) 
        VALUES( $1, $2, $3) RETURNING *`,
      [lead_id, insured_id, beneficiary_id]
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
        SELECT  LEA.insured_id,
                BEN.id,
                BEN.rut,
                BEN.name,
                BEN.paternallastname,
                BEN.maternallastname,
                BEN.birthdate,
                BEN.address,
                BEN.district,
                BEN.email,
                BEN.phone
        FROM    app.leadbeneficiary LEA INNER JOIN app.beneficiary BEN ON LEA.beneficiary_id = BEN.id
        WHERE   LEA.lead_id = $1`,
      [lead_id]
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createModel, getByLeadId, deleteByLeadId };
