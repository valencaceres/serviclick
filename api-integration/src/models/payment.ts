import pool from "../util/database";
import { _upsert } from "../queries/payment";

const upsert: any = async (
    lead_id: string,
    status: number,
  ) => {
    try {
  
      const paymentUpsert = await pool.query(_upsert, [
      lead_id,
        status  
      ]);
      return {
        success: true,
        data: paymentUpsert.rows[0].integration_lead_feedback,
        error: null,
      };
    } catch (e) {
      return { success: false, data: null, error: (e as Error).message };
    }
  };

  export { upsert}