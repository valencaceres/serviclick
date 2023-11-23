import pool from "../util/database";

const getAllHero = async () => {
  try {
    const query = `
        SELECT * FROM app.www_hero ORDER BY number;
      `;
    const result = await pool.query(query);
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAllNews = async () => {
  try {
    const query = `
        SELECT * FROM app.www_news ORDER BY number;
      `;
    const result = await pool.query(query);
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getAllHero, getAllNews };
