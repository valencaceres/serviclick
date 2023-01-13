import pool from "../util/database";
import createLogger from "../util/logger";

const createModel: any = async (
  id: string,
  agent_id: string,
  plan_id: number,
  type: string,
  price: number,
  frequency: string,
  discount: any
) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.productPlan(agent_id, createdate, product_id, plan_id, type, price, frequency, discount_type, discount_percent, discount_cicles) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        agent_id,
        new Date().toISOString(),
        id,
        plan_id,
        type,
        price,
        frequency,
        discount.type,
        discount.percent,
        discount.cicles,
      ]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByProductIdModel: any = async (
  product_id: string,
  agent_id: string
) => {
  try {
    const result = await pool.query(
      "SELECT id, createdate, plan_id, type, price, frequency, discount_type, discount_percent, discount_cicles FROM app.productPlan WHERE product_id = $1 AND agent_id = $2",
      [product_id, agent_id]
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createModel, getByProductIdModel };
