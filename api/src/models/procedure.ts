import pool from "../util/database";

import { _getAll } from "../queries/procedure";

const getAll: any = async () => {
  try {
    const result = await pool.query(_getAll);

    return {
      success: true,
      data: result.rows || [],
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getAll };
