//import axios from "axios";

import createLogger from "../util/logger";
import { createSubscriptionModel } from "../models/subscription";
import { updateSubscription } from "../models/lead";
import { createPaymentModel } from "../models/payment";

import config from "../util/config";
import axiosMonitored from "../util/axios";

const reveniuController = async (req: any, res: any) => {
  try {
    const { data } = req.body;
    const { event } = data;
    const { subscription_id, lead_id } = data.data;

    if (lead_id) {
      const leadResponse = await updateSubscription(lead_id, subscription_id);

      if (!leadResponse.success) {
        createLogger.error({
          model: "reveniu/updateSubscription",
          error: leadResponse.error,
        });
        res.status(500).json({ error: leadResponse.error });
        return;
      }
    }

    if (event === "subscription_activated") {
      // createLogger.info({
      //   url: config.webHook.URL.subscriptionActivated,
      //   method: "POST",
      //   body: {
      //     subscription_id,
      //   },
      //   params: "",
      //   query: "",
      // });
      // const webHookResponse = await axios.post(
      //   config.webHook.URL.subscriptionActivated,
      //   {
      //     subscription_id,
      //   },
      //   {
      //     headers: { id: config.apiKey },
      //   }
      // );
      // TODO: Marcar tarjeta activada
    }

    // createLogger.info({
    //   url: `${config.reveniu.URL.subscription}${subscription_id}`,
    //   method: "GET",
    //   body: "",
    //   params: "",
    //   query: "",
    // });

    // const subscriptionReveniuResponse = await axios.get(
    //   `${config.reveniu.URL.subscription}${subscription_id}`,
    //   {
    //     headers: config.reveniu.apiKey,
    //   }
    // );
    const subscriptionReveniuResponse = await axiosMonitored(
      "get",
      `${config.reveniu.URL.subscription}${subscription_id}`,
      null,
      config.reveniu.apiKey
    );

    if (!subscriptionReveniuResponse.success) {
      createLogger.error({
        url: `${config.reveniu.URL.subscription}${subscription_id}`,
        error: subscriptionReveniuResponse.error,
      });
      res.status(500).json({ error: subscriptionReveniuResponse.error });
      return;
    }

    const {
      status: status_id,
      interval: interval_id,
      plan_id,
      plan_amount,
      last_payment,
    } = subscriptionReveniuResponse.data;
    const { date: last_payment_date, status } = last_payment;

    const subscriptionResponse = await createSubscriptionModel(
      status_id,
      interval_id,
      subscription_id,
      plan_amount,
      plan_id,
      last_payment_date,
      status
    );

    if (!subscriptionResponse.success) {
      createLogger.error({
        model: "reveniu/createSubscriptionModel",
        error: subscriptionResponse.error,
      });
      res.status(500).json({ error: subscriptionResponse.error });
      return;
    }

    // createLogger.info({
    //   url: `${config.reveniu.URL.subscription}${subscription_id}/payments`,
    //   method: "GET",
    //   body: "",
    //   params: "",
    //   query: "",
    // });

    // const paymentReveniuResponse = await axios.get(
    //   `${config.reveniu.URL.subscription}${subscription_id}/payments`,
    //   {
    //     headers: config.reveniu.apiKey,
    //   }
    // );
    const paymentReveniuResponse = await axiosMonitored(
      "get",
      `${config.reveniu.URL.subscription}${subscription_id}/payments`,
      null,
      config.reveniu.apiKey
    );

    if (!paymentReveniuResponse.success) {
      createLogger.error({
        url: `${config.reveniu.URL.subscription}${subscription_id}/payments`,
        error: paymentReveniuResponse.error,
      });
      res.status(500).json({ error: paymentReveniuResponse.error });
      return;
    }

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

    if (payments.length === 1 && payments[0].gateway_response === "0") {
      axiosMonitored(
        "post",
        config.webHook.URL.subscriptionActivated,
        {
          subscription_id,
        },
        config.apiKey
      );
    }

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
