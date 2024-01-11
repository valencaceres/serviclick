import pool from "../util/database";
import { _upsert } from "../queries/lead";
import { UpsertRequest } from "../interfaces/leadRequest";

const upsert: any = async (
    requestData: UpsertRequest
  ) => {
    try {
        const { product_id, holder, beneficiaries, values, agent_id } = requestData;
      const leadUpsert = await pool.query(_upsert, [
        product_id,
        holder,
        beneficiaries,
        values,
        agent_id
      ]);
      return {
        success: true,
        data: leadUpsert.rows[0].integration_lead_upsert,
        error: null,
      };
    } catch (e) {
      return { success: false, data: null, error: (e as Error).message };
    }
  };

  export { upsert}