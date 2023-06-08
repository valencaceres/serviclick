import pool from "../util/database";
import { format } from "date-fns";

const create = async (customDate?: string) => {
  try {
    const dateToFormat = customDate ? new Date(customDate) : new Date();
    const createDate = format(dateToFormat, "yyyy-MM-dd HH:mm:ss");

    const response = await pool.query(
      `INSERT INTO app.policy
      (createdate, startdate)
      VALUES ($1, $2) RETURNING *`,
      [createDate, createDate]
    );

    return { success: true, data: response.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create };
