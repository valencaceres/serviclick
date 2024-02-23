import moment from "moment";
import { format } from "date-fns";

import pool from "../util/database";
import createLogger from "../util/logger";

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
      `SELECT MAX(subscription_id) AS max_subscription_id
      FROM app.subscription
      WHERE subscription_id < 74000`
    );
    const maxSubscriptionId = rows[0]?.max_subscription_id;
    const subscription_id = maxSubscriptionId + 1;

    // Determina la fecha. Si se pasa customDate, formatearla; de lo contrario, usar la fecha actual.
    const dateToFormat = customDate ? new Date(customDate) : new Date();
    const date = format(dateToFormat, "yyyy-MM-dd HH:mm:ss");

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

const createSubscriptionModelCron: any = async (
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

    createLogger.info({
      model: "reveniu/createSubscriptionModel",
      input: {
        status_id,
        interval_id,
        subscription_id,
        plan_amount,
        plan_id,
        last_payment_date,
        status,
      },
    });

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

const updateLastPaymentCron: any = async (subscription_id: number) => {
  try {
    const resultPayment = await pool.query(
      "select max(date) as date from app.payment where subscription_id = $1",
      [subscription_id]
    );

    if (resultPayment.rows.length > 0) {
      const result = await pool.query(
        `
        UPDATE  app.subscription
        SET     last_payment_date = $2,
                last_payment_success = $3
        WHERE   subscription_id = $1
        RETURNING *`,
        [subscription_id, resultPayment.rows[0].date, true]
      );
    }

    return { success: true, data: true, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};



export { createModel, create, updateLastPaymentCron ,createSubscriptionModelCron };
