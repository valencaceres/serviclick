import pool from "../util/database";
import createLogger from "../util/logger";

const createModel: any = async (
  id: string,
  plan_id: number,
  type: string,
  price: number,
  frequency: string
) => {
  createLogger.error({
    model: "product/createModel",
    input: {
      id,
      plan_id,
      type,
      price,
      frequency,
    },
  });
  try {
    const result = await pool.query(
      "INSERT INTO app.productPlan(createdate, product_id, plan_id, type, price, frequency) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [new Date().toISOString(), id, plan_id, type, price, frequency]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByProductIdModel: any = async (product_id: string) => {
  try {
    const result = await pool.query(
      "SELECT id, createdate, plan_id, type, price, frequency FROM app.productPlan WHERE product_id = $1",
      [product_id]
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createModel, getByProductIdModel };
