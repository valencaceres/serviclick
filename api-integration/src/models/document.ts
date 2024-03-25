import pool from "../util/database";

const upsert: any = async (lead_id: string, document: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.integrationdocument(lead_id, document) VALUES ($1, $2) ON CONFLICT(lead_id) DO UPDATE SET document = $2 RETURNING lead_id, document",
      [lead_id, document]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { upsert };
