import pool from "../util/database";

const getAll: any = async () => {
  try {
    const result = await pool.query("SELECT id, name FROM app.relationship");
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getAll };
