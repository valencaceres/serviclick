import { format } from "date-fns";

import pool from "../util/database";

const create: any = async () => {
  try {
    const createdDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const result = await pool.query(
      "INSERT INTO app.plan(createddate) VALUES ($1) RETURNING *",
      [createdDate]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create };
