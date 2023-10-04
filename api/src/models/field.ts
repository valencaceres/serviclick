import pool from "../util/database";

import { queryGetByProductPlanId } from "../queries/field";

const getByProductPlanId: any = async (productPlan_id: string) => {
  try {
    const result = await pool.query(queryGetByProductPlanId, [productPlan_id]);
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getByProductPlanId };
