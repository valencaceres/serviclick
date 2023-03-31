import pool from "../util/database";

const uploadDocument: any = async (
  case_id: string,
  casestage_id: string,
  document_id: string,
  file_name: string,
  base64: string,
  mimeType: string
) => {
  try {
    const exist = await pool.query(
      "SELECT * FROM app.casestageattach WHERE case_id = $1 AND casestage_id = $2 AND document_id = $3",
      [case_id, casestage_id, document_id]
    );

    if (exist.rows.length > 0) {
      const result = await pool.query(
        "UPDATE app.casestageattach SET file_name = $1, base64 = $2 WHERE case_id = $3 AND casestage_id = $4 AND document_id = $5 AND mime_type = $6 RETURNING *",
        [file_name, base64, case_id, casestage_id, document_id, mimeType]
      );
      return { success: true, data: result.rows[0], error: null };
    }

    const result = await pool.query(
      `INSERT INTO app.casestageattach(case_id, casestage_id, document_id, file_name, base64, mime_type)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [case_id, casestage_id, document_id, file_name, base64, mimeType]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (case_id: string, casestage_id: string) => {
  try {
    const result = await pool.query(
      `SELECT * FROM app.casestageattach WHERE case_id = $1 AND casestage_id = $2`,
      [case_id, casestage_id]
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { uploadDocument, getById };
