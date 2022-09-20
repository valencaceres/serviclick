import { format } from "date-fns";

import pool from "../util/database";

const createModel: any = async (
  subscription_id: string,
  event: string,
  buy_order: string
) => {
  try {
    const date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const result = await pool.query(
      "INSERT INTO app.subscription(subscription_id, date, event, buy_order) VALUES ($1, $2, $3, $4) RETURNING *",
      [subscription_id, date, event, buy_order]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createModel };
