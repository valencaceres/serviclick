import pool from "../util/database";

const getAll = async () => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT ON (cat.name, wc.number) cat.id, cat.name, fam.id as family_id, fam.name as family_name,
      wc.alt, wc.url, wc.link, wc.number
  FROM app.category cat
  INNER JOIN app.categoryproduct cap ON cap.category_id = cat.id
  INNER JOIN app.product pro ON cap.product_id = pro.id
  INNER JOIN app.family fam ON pro.family_id = fam.id
  LEFT JOIN app.www_category wc ON cat.id = wc.category_id
    ORDER BY cat.name, wc.number;`
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getAll };
