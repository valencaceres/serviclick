import moment from "moment";
import { format } from "date-fns";

import pool from "../util/database";

const createModel: any = async (
  status_id: number,
  interval_id: number,
  subscription_id: number,
  plan_amount: number,
  plan_id: number,
  last_payment_date: string,
  status: string
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
        last_payment_date &&
        status === "0" &&
        moment(last_payment_date).isValid()
          ? moment(last_payment_date).local().format()
          : null,
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
          last_payment_date &&
          status === "0" &&
          moment(last_payment_date).isValid()
            ? moment(last_payment_date).local().format()
            : null,
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
          last_payment_date &&
          status === "0" &&
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

const create: any = async (
  plan_amount: number,
  plan_id: number,
  customDate?: string
) => {
  try {
    // Genera una subscription_id encontrando el máximo subscription_id de la base de datos.
    const { rows } = await pool.query(
      `SELECT MAX(subscription_id)
      FROM app.subscription
      WHERE subscription_id < 74000`
      );
      const subscription_id = rows[0].max + 1;
      
      // Determina la fecha. Si se pasa customDate, formatearla; de lo contrario, usar la fecha actual.
      const dateToFormat = customDate ? new Date(customDate) : new Date();
      const date = format(dateToFormat, "yyyy-MM-dd HH:mm:ss");
      console.log(date)
      
    const sql = `
      INSERT INTO app.subscription(
          date,
          interval_id,
          status_id,
          subscription_id,
          plan_id,
          plan_amount)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;

    const result = await pool.query(sql, [
      date,
      0,
      0,
      subscription_id,
      plan_id,
      plan_amount,
    ]);

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createModel, create };
