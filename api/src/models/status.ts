import pool from "../util/database";

const getAllModel: any = async (values: any) => {
  try {
    const result = await pool.query(
      "SELECT id, name FROM app.status WHERE isActive IS true ORDER BY name"
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getAllModel };
