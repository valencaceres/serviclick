import pool from "../../util/database";

const updateSubscriptionGateway: any = async (
    lead_id: string,
    subscription_id: number
  ) => {
    try {
      const result = await pool.query(
        `
          UPDATE  app.lead
          SET     gateway_subscription_id = $1,
                  paymenttype_code = 'C'
          WHERE   id = $2 RETURNING *`,
        [subscription_id, lead_id]
      );
      return { success: true, data: result.rows[0], error: null };
    } catch (e) {
      return { success: false, data: null, error: (e as Error).message };
    }
  };

  export {updateSubscriptionGateway}