import moment from "moment";

import createLogger from "../util/logger";
import * as cronModel from "../models/cron";
import * as Lead from "../models/lead";
import * as Payment from "../models/payment";
import * as Policy from "../models/policy";

import config from "../util/config";
import axiosMonitored from "../util/axios";
import { apiReveniu } from "../util/api";

interface IPayment {
  payment_id: number;
  date: string | null;
  amount: number;
  buy_order: number;
  credit_card_type: string;
  is_recurrent: boolean;
  gateway_response: string;
}

interface ISubscriptionResume {
  subscription_id: number;
  payments: IPayment[];
}

const process = async () => {
  try {
    const cronResponse = await cronModel.getAll();

    if (!cronResponse.success) {
      createLogger.error({
        model: `cron/getAll`,
        error: cronResponse.error,
      });
      return;
    }

    let subscriptions: ISubscriptionResume[] = [];

    for (const process of cronResponse.data) {
      const { subscription_id, event } = process;
      if (event === "subscription_payment_succeeded") {
        const subscriptionReveniuResponse = await apiReveniu.get(
          `/subscriptions/${subscription_id}`
        );
        // const subscriptionReveniuResponse = await axiosMonitored(
        //   "get",
        //   `${config.reveniu.URL.subscription}${subscription_id}`,
        //   null,
        //   config.reveniu.apiKey
        // );

        // if (!subscriptionReveniuResponse.success) {
        //   createLogger.error({
        //     url: `${config.reveniu.URL.subscription}${subscription_id}`,
        //     error: subscriptionReveniuResponse.error,
        //   });
        //   return;
        // }

        const {
          status: status_id,
          interval: interval_id,
          plan_id,
          plan_amount,
          last_payment,
        } = subscriptionReveniuResponse.data;
        const { date: last_payment_date, status } = last_payment;

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
          return;
        }

        const { payments } = paymentReveniuResponse.data;

        const subscriptionData = {
          subscription_id,
          status_id,
          interval_id,
          plan: {
            id: plan_id,
            amount: plan_amount,
          },
          last_payment: {
            date: moment(last_payment_date).isValid()
              ? moment(last_payment_date).local().format()
              : null,
            success: status === 0,
          },
          payments: payments
            .filter((payment: any) => payment.gateway_response === "0")
            .map((payment: any) => {
              return {
                payment_id: payment.id,
                date: moment(payment.issued_on).isValid()
                  ? moment(payment.issued_on).local().format()
                  : null,
                amount: payment.amount,
                buy_order: payment.buy_order,
                credit_card_type: payment.credit_card_type,
                is_recurrent: payment.is_recurrent,
                gateway_response: payment.gateway_response,
              };
            }),
        };

        //   for (const payment of subscriptionData.payments) {
        //     if (payment.date) {
        //       const paymentResponse = await Payment.createPaymentModel(
        //         payment.payment_id,
        //         payment.date,
        //         subscription_id,
        //         payment.amount,
        //         payment.buy_order,
        //         payment.credit_card_type,
        //         payment.is_recurrent,
        //         payment.gateway_response
        //       );

        //       if (!paymentResponse.success) {
        //         createLogger.error({
        //           model: "reveniu/createPaymentModel",
        //           error: paymentResponse.error,
        //         });
        //         return;
        //       }
        //     }
        //   }

        //   const leadResponse = Lead.getPolicyBySubscriptionId(subscription_id);

        //   if (!leadResponse.success) {
        //     createLogger.error({
        //       model: `lead/getPolicyBySubscriptionId`,
        //       error: leadResponse.error,
        //     });
        //     return;
        //   }

        //   const { id: policy_id, lack } = leadResponse.data;

        //   if (!policy_id) {
        //     const policyResponse = Policy.create(lack);

        //     if (!policyResponse.success) {
        //       createLogger.error({
        //         model: `policy/create`,
        //         error: policyResponse.error,
        //       });
        //       return;
        //     }

        //     axiosMonitored(
        //       "post",
        //       config.webHook.URL.subscriptionActivated,
        //       { subscription_id },
        //       config.apiKey
        //     );
        //   }

        //   subscriptions.push({ subscription_id: subscription_id, payments });
      }
    }

    createLogger.info({
      controller: "reveniu",
      message: "OK",
    });
    return;
  } catch (error) {
    createLogger.error({
      controller: "reveniu",
      error: (error as Error).message,
    });
    return;
  }
};

export { process };
