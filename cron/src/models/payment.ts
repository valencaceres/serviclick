import createLogger from "../util/logger";
import pool from "../util/database";

const createPaymentModel: any = async (
  payment_id: number,
  date: string,
  subscription_id: number,
  amount: number,
  buy_order: string,
  credit_card_type: string,
  is_recurrent: boolean,
  gateway_response: string
) => {
  try {
    createLogger.info({
      model: "reveniu/createPaymentModel",
      input: {
        payment_id,
        date,
        subscription_id,
        amount,
        buy_order,
        credit_card_type,
        is_recurrent,
        gateway_response,
      },
    });

    const resultPayment = await pool.query(
      "SELECT * FROM app.payment WHERE payment_id = $1",
      [payment_id]
    );

    let result: any;
    if (resultPayment.rows.length === 0) {
      if (gateway_response === "0") {
        result = await pool.query(
          `INSERT   INTO app.payment(
                    payment_id,
                    date,
                    subscription_id,
                    amount,
                    buy_order,
                    credit_card_type,
                    is_recurrent,
                    gateway_response)
           VALUES  ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING *`,
          [
            payment_id,
            date,
            subscription_id,
            amount,
            buy_order,
            credit_card_type,
            is_recurrent,
            gateway_response,
          ]
        );
      }
    }
    return {
      success: true,
      data: result?.rows ? result?.rows[0] : resultPayment?.rows[0],
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createPaymentModel };
