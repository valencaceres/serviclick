import pool from "../util/database";

const updateSubscription: any = async (
  lead_id: string,
  subscription_id: number
) => {
  try {
    const result = await pool.query(
      `
        UPDATE  app.lead
        SET     subscription_id = $1,
                paymenttype_code = 'C'
        WHERE   id = $2 RETURNING *`,
      [subscription_id, lead_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getPolicyBySubscriptionId: any = async (subscription_id: number) => {
  try {
    const result = await pool.query(
      ` select 	lea.id,
                max(lea.policy_id :: text) as policy_id,
                min(pas.lack) as lack
        from 	  app.lead lea
                  inner join app.leadproduct lpr on lea.id = lpr.lead_id
                  inner join app.productassistance pas on lpr.product_id = pas.product_id
        where 	lea.subscription_id = 74340
        group   by
                lea.id`,
      [subscription_id]
    );
    return {
      success: true,
      data: result.rows,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { updateSubscription, getPolicyBySubscriptionId };
