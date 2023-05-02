import pool from "../util/database";

const uploadDocument: any = async (
  case_id: string,
  document_id: string,
  file_tag: string
) => {
  try {
    const exist = await pool.query(
      "SELECT * FROM app.casestageattach WHERE case_id = $1 AND document_id = $2",
      [case_id, document_id]
    );

    if (exist.rows.length > 0) {
      const result = await pool.query(
        "UPDATE app.casestageattach SET file_tag = $1 WHERE case_id = $2 AND document_id = $3 RETURNING *",
        [file_tag, case_id, document_id]
      );
      return { success: true, data: result.rows[0], error: null };
    }

    const result = await pool.query(
      `INSERT INTO app.casestageattach(case_id, document_id, file_tag)
      VALUES ($1, $2, $3) RETURNING *`,
      [case_id, document_id, file_tag]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (case_id: string) => {
  try {
    const result = await pool.query(
      `SELECT * FROM app.casestageattach WHERE case_id = $1`,
      [case_id]
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { uploadDocument, getById };
