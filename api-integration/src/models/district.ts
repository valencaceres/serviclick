import pool from "../util/database";

const getAll: any = async () => {
  try {
    const result = await pool.query(
      "SELECT id, region_number,  region_name, province_name, district_name  FROM app.district ORDER BY district_name"
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getAll };
