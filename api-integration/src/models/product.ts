import pool from "../util/database";
import { _getAll, _getById } from "../queries/product";
const getAll: any = async (agent_id: string) => {
    try {
      const result = await pool.query(_getAll,[
        agent_id
      ]);
      return { success: true, data: result.rows[0].integration_product_get_all, error: null };
    } catch (e) {
      return { success: false, data: null, error: (e as Error).message };
    }
  };

  const getById: any = async (id: string) => {
    try {
      const result = await pool.query(_getById, [id]);
      return { success: true, data: result.rows[0].integration_product_get_by_id, error: null };
    } catch (e) {
      return { success: false, data: null, error: (e as Error).message };
    }
  };

  export { getAll, getById}