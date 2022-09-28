import axios from "axios";

import createLogger from "../util/logger";
import { createSubscriptionModel } from "../models/subscription";
import { createPaymentModel } from "../models/payment";

import config from "../util/config";

const reveniuController = async (req: any, res: any) => {
  try {
    const { data } = req.body;
    const { subscription_id } = data.data;

    const subscriptionReveniuResponse = await axios.get(
      `${config.reveniu.URL.subscription}${subscription_id}`,
      {
        headers: config.reveniu.apiKey,
      }
    );

    const {
      status: status_id,
      interval: interval_id,
      plan_id,
      plan_amount,
      last_payment,
    } = subscriptionReveniuResponse.data;
    const { date: last_payment_date } = last_payment;

    const subscriptionResponse = await createSubscriptionModel(
      status_id,
      interval_id,
      subscription_id,
      plan_amount,
      plan_id,
      last_payment_date
    );

    if (!subscriptionResponse.success) {
      createLogger.error({
        model: "reveniu/createSubscriptionModel",
        error: subscriptionResponse.error,
      });
      res.status(500).json({ error: subscriptionResponse.error });
      return;
    }

    const paymentReveniuResponse = await axios.get(
      `${config.reveniu.URL.subscription}${subscription_id}/payments`,
      {
        headers: config.reveniu.apiKey,
      }
    );

    const { payments } = paymentReveniuResponse.data;

    payments.map(async (payment: any) => {
      const {
        id: payment_id,
        amount,
        issued_on: date,
        buy_order,
        credit_card_type,
        is_recurrent,
        gateway_response,
      } = payment;

      const paymentResponse = await createPaymentModel(
        payment_id,
        date,
        subscription_id,
        amount,
        buy_order,
        credit_card_type,
        is_recurrent,
        gateway_response
      );

      if (!paymentResponse.success) {
        createLogger.error({
          model: "reveniu/createPaymentModel",
          error: paymentResponse.error,
        });
        res.status(500).json({ error: paymentResponse.error });
        return;
      }
    });

    createLogger.info({
      controller: "reveniu",
      message: "OK",
    });
    res.status(200).json(subscriptionResponse.data);
  } catch (error) {
    createLogger.error({
      controller: "reveniu",
      error: (error as Error).message,
    });
    res.status(500).json({ error });
    return;
  }
};

export { reveniuController };
