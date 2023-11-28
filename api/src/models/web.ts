import pool from "../util/database";

const getAllItems = async (type: string) => {
  try {
    const query = `
      SELECT * FROM app.www_${type} ORDER BY number;
    `;
    const result = await pool.query(query);
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const createItem: any = async (
  type: "hero" | "news" | "category" | "family",
  url: string,
  alt: string,
  text: string,
  link: string,
  category_id: string,
  family_id: string
) => {
  try {
    const maxNumberResult = await pool.query(
      `SELECT MAX(number) as max_number FROM app.www_${type}`
    );

    const newNumber = (maxNumberResult.rows[0].max_number || 0) + 1;
    let result;
    if (type === "category") {
      result = await pool.query(
        `INSERT INTO app.www_${type}(url, alt, text, number, link, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [url, alt, text, newNumber, link, category_id]
      );
    } else if (type === "family") {
      result = await pool.query(
        `INSERT INTO app.www_${type}(url, alt, text, number, link, family_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [url, alt, text, newNumber, link, family_id]
      );
    } else {
      result = await pool.query(
        `INSERT INTO app.www_${type}(url, alt, text, number, link) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [url, alt, text, newNumber, link]
      );
    }

    const insertedItem = result.rows[0];

    return { success: true, data: insertedItem, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const orderItem: any = async (
  heroes: Array<{
    url: string;
    alt: string;
    text: string;
    id: string;
    link: string;
    number: number;
  }>,
  type: string
) => {
  try {
    const results = [];

    for (const hero of heroes) {
      const { url, alt, text, id, number, link } = hero;
      const result = await pool.query(
        `UPDATE app.www_${type} SET url = $1, alt = $2, text = $3, link= $6, number = $4 WHERE id = $5 RETURNING *`,
        [url, alt, text, number, id, link]
      );

      results.push(result.rows[0]);
    }
    return { success: true, data: results, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};
const deleteItemById: any = async (id: string, type: string) => {
  try {
    const result = await pool.query(
      `DELETE FROM app.www_${type} WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return { success: false, data: null, error: "Hero not found" };
    }

    return { success: true, data: result.rows[0], error: null };
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
const updateItem = async (
  id: string,
  alt: string,
  text: string,
  link: string,
  type: string,
  category_id: string,
  family_id: string
) => {
  try {
    let result;
    if (type === "category") {
      result = await pool.query(
        `UPDATE app.www_${type} SET alt = $2, text = $3, link = $4, category_id = $5 WHERE id = $1 RETURNING *`,
        [id, alt, text, link, category_id]
      );
    } else if (type === "family") {
      result = await pool.query(
        `UPDATE app.www_${type} SET alt = $2, text = $3, link = $4, family_id = $5 WHERE id = $1 RETURNING *`,
        [id, alt, text, link, family_id]
      );
    } else {
      result = await pool.query(
        `UPDATE app.www_${type} SET alt = $2, text = $3, link = $4 WHERE id = $1 RETURNING *`,
        [id, alt, text, link]
      );
    }

    if (result.rows.length === 0) {
      return { success: false, data: null, error: "Hero not found" };
    }

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export {
  getAllItems,
  getAllNews,
  createItem,
  orderItem,
  deleteItemById,
  updateItem,
};
