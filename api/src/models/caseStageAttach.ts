import pool from "../util/database";

const uploadDocument: any = async (
  case_id: string,
  casestage_id: string,
  document_id: string,
  file_name: string,
  base64: string
) => {
  try {
    const result = await pool.query(
      `INSERT INTO app.casestageattach(case_id, casestage_id, document_id, file_name, base64)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [case_id, casestage_id, document_id, file_name, base64]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { uploadDocument };
