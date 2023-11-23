import pool from "../util/database";

const getAll = async () => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT ON (cat.name, cat.number) cat.id, cat.name, fam.id as family_id, fam.name as family_name
      FROM app.category cat
      INNER JOIN app.product pro ON cat.product_id = pro.id
      INNER JOIN app.family fam ON pro.family_id = fam.id
      ORDER BY cat.number`
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getAll };
