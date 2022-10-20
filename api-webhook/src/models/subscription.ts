import moment from "moment";
import { format } from "date-fns";

import pool from "../util/database";

const createSubscriptionModel: any = async (
  status_id: number,
  interval_id: number,
  subscription_id: number,
  plan_amount: number,
  plan_id: number,
  last_payment_date: string
) => {
  try {
    const date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    let result: any;

    result = await pool.query(
      `
      INSERT  INTO app.subscription_history(
              date,
              subscription_id,
              status_id,
              interval_id,
              plan_id,
              plan_amount,
              last_payment_date)
      VALUES  ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        date,
        subscription_id,
        status_id,
        interval_id,
        plan_id,
        plan_amount,
        last_payment_date,
      ]
    );

    const resultSubscription = await pool.query(
      "SELECT 1 FROM app.subscription WHERE subscription_id = $1",
      [subscription_id]
    );

    if (resultSubscription.rows.length > 0) {
      result = await pool.query(
        `
        UPDATE  app.subscription
        SET     date = $1,
                status_id = $2,
                interval_id = $3,
                plan_id =$4,
                plan_amount = $5,
                last_payment_date = $6
        WHERE   subscription_id = $7
        RETURNING *`,
        [
          date,
          status_id,
          interval_id,
          plan_id,
          plan_amount,
          moment(last_payment_date).local().format(),
          subscription_id,
        ]
      );
    } else {
      result = await pool.query(
        `
        INSERT  INTO app.subscription(
                date,
                subscription_id,
                status_id,
                interval_id,
                plan_id,
                plan_amount,
                last_payment_date)
        VALUES  ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [
          date,
          subscription_id,
          status_id,
          interval_id,
          plan_id,
          plan_amount,
          moment(last_payment_date).isValid()
            ? moment(last_payment_date).local().format()
            : null,
        ]
      );
    }
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createSubscriptionModel };
