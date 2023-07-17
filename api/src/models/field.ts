import pool from "../util/database";

import { queryGetByLeadId } from "../queries/field";

const getByLeadId: any = async (lead_id: string) => {
  try {
    const result = await pool.query(queryGetByLeadId, [lead_id]);
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getByLeadId };
