import createLogger from "../util/logger";

import {
  getActivesByRutAndProductIdModel,
  getByFiltersModel,
  getBySubscriptionId,
  changeAmountModel,
  changeStatusModel,
  fillReveniuTables as fillReveniuTablesModel,
  updateSubscriptionModelDifferences
} from "../models/transaction";
import { apiReveniu } from "../util/reveniu";

const getActivesByRutAndProductIdController = async (req: any, res: any) => {
  const { customer_type, rut, product_id } = req.body;

  const transactionResponse = await getActivesByRutAndProductIdModel(
    customer_type,
    rut,
    product_id
  );

  if (!transactionResponse.success) {
    createLogger.error({
      model: "transaction/getActivesByRutAndProductIdModel",
      error: transactionResponse.error,
    });
    res.status(500).json({ error: "Error retrieving transactions" });
    return;
  }

  createLogger.info({
    controller: "transaction/getActivesByRutAndProductIdController",
    message: "OK",
  });
  res.status(200).json(transactionResponse.data);
};

const getByFiltersController = async (req: any, res: any) => {
  const { channel_id, client_type, rut, period_id, status_id } = req.body;

  const transactionResponse = await getByFiltersModel(
    channel_id,
    client_type,
    rut,
    period_id,
    status_id
  );

  if (!transactionResponse.success) {
    createLogger.error({
      model: "transaction/getByFiltersModel",
      error: transactionResponse.error,
    });
    res.status(500).json({ error: "Error retrieving transactions" });
    return;
  }

  createLogger.info({
    controller: "transaction/getAllController",
    message: "OK",
  });
  res.status(200).json(transactionResponse.data);
};

const getBySubscription = async (req: any, res: any) => {
  const { id } = req.params;
  const transactionResponse = await getBySubscriptionId(id);
  let subscriptionData: any
  let subscriptionDataPayments: any
if(transactionResponse.success && transactionResponse.data){
  async function getData() {
    try {
      subscriptionData = await apiReveniu.get(
        `/subscriptions/${transactionResponse.data[0].id}`
      );
  
      await new Promise(resolve => setTimeout(resolve, 4000)); 
  
      subscriptionDataPayments = await apiReveniu.get(
        `/subscriptions/${transactionResponse.data[0].id}/payments`
      );
    } catch (error) {
      console.error("error getting data", error);
    }
  }
  await getData();

  if (subscriptionData && subscriptionData.data && subscriptionDataPayments && subscriptionDataPayments.data) {
  const subscriptionDataWithReveniu = {
    ...transactionResponse.data[0],
    payment_method: subscriptionData.data.payment_method,
    total_successful_payments: subscriptionData.data.total_successful_payments,
    next_due_date: subscriptionData.data.next_due,
    created_on: subscriptionData.data.created_on,
    paymentsArray: subscriptionDataPayments.data.payments,
    frequency: subscriptionData.data.interval,
    plan_amount: subscriptionData.data.plan_amount,
    is_uf: subscriptionData.data.is_uf,
    statusSubscription: subscriptionData.data.status,

  }
  createLogger.info({
    controller: "transaction/getById",
    message: "OK",
  });
  res.status(200).json(subscriptionDataWithReveniu);
  return;
  } 

}
  if (!transactionResponse.success) {
    createLogger.error({
      model: "transaction/getByIdModel",
      error: transactionResponse.error,
    });
    res.status(500).json({ error: "Error retrieving transaction" });
    return;
  }

  createLogger.info({
    controller: "transaction/getById",
    message: "OK",
  });
  res.status(200).json(transactionResponse.data);
}

const changeAmount = async (req: any, res: any) => {
  const { id, amount } = req.body;

  if (!id || !amount) {
    res.status(400).json({ error: "Missing id or amount in request body" });
    return;
  }

  const transactionResponse = await changeAmountModel(id, amount);

  if (!transactionResponse.success) {
    createLogger.error({
      model: "transaction/changeAmountModel",
      error: transactionResponse.error,
    });
    res.status(500).json({ error: "Error in changeAmountModel" });
    return;
  }

  if (transactionResponse.success) {
    try {
      const amountReveniu = await apiReveniu.post(`/subscriptions/${id}/amount/`, { amount });
    } catch (error) {
      console.error('error updating amount:', error);
      res.status(500).json({ error: "Error in apiReveniu POST request" });
      return;
    }
  }

  createLogger.info({
    controller: "transaction/changeAmount",
    message: "OK",
  });
  res.status(200).json(transactionResponse.data);
}
const changeDate = async (req: any, res: any) => {
  const { id, date } = req.body;
  
  const lastPartOfDate = date.split("-").pop();
  const dayOfMonth = parseInt(lastPartOfDate, 10); 
  if (!id || !date) {
    res.status(400).json({ error: "Missing id or date in request body" });
    return;
  }

    try {
      const dateReveniu = await apiReveniu.post(`/subscriptions/${id}/dueday/`, { new_day:dayOfMonth });
    } catch (error) {
      console.error('error updating date:', error);
      res.status(500).json({ error: "Error in apiReveniu POST request" });
      return;
    }
  createLogger.info({
    controller: "transaction/changeDate",
    message: "OK",
  });
  res.status(200).json("next_due_date succesful update");
}

const changeStatus = async (req: any, res: any) => {
  const { id, isdeactivated } = req.body;

  if (!id || !isdeactivated) {
    res.status(400).json({ error: "Missing id or status_id in request body" });
    return;
  }
  if(isdeactivated){
    const transactionResponse = await changeStatusModel(id);

    if (!transactionResponse.success) {
      createLogger.error({
        model: "transaction/changeStatusModel",
        error: transactionResponse.error,
      });
      res.status(500).json({ error: "Error in changeStatusModel" });
      return;
    }else{
      try {
        const disable = await apiReveniu.post(`/subscriptions/${id}/disable/`);

      } catch (error) {
        console.error('error disabling subscription:', error);
        res.status(500).json({ error: "Error in apiReveniu POST request" });
        return;
      }
    }
    
  
  }
  else{
    try {
      const disable = await apiReveniu.post(`/subscriptions/${id}/disablerenew/`);

    } catch (error) {
      console.error('error cancelling renewal:', error);
      res.status(500).json({ error: "Error in apiReveniu POST request" });
      return;
    }
  }



  createLogger.info({
    controller: "transaction/changeStatus",
    message: "OK",
  });
  res.status(200).json({message: "Status updated"});
}

const changeMethod = async (req: any, res: any) => {
  const { id,  } = req.body;

  if (!id ) {
    res.status(400).json({ error: "Missing id  in request body" });
    return;
  }
  try {
    const change_method = await apiReveniu.post(`/subscriptions/change_method/`,{subs:[id]});
  } catch (error) {
    console.error('error cancelling renewal:', error);
    res.status(500).json({ error: "Error in apiReveniu POST request" });
    return;
  }
 



  createLogger.info({
    controller: "transaction/changeCreditCard",
    message: "OK",
  });
  res.status(200).json({message: "email sent to the customer" });
}


const fillReveniuTables = async (req: any, res: any) => {
  try {
    let numberOfSubscriptions = Infinity; 
    const { quantity } = req.body;
    if (quantity) {
      numberOfSubscriptions = parseInt(quantity);
      if (isNaN(numberOfSubscriptions) || numberOfSubscriptions <= 0) {
        throw new Error("Invalid quantity parameter.");
      }
    }

    const response = await apiReveniu.get(`/subscriptions/`);
    const subscriptionsData = response.data.data;
    const mergedData = [];
    const queries = [];
    let count = 0; 

    for (const subscription of subscriptionsData) {
      if (count >= numberOfSubscriptions) {
        break; 
      }
      const customer = subscription.customer;
      const subscriptionId = subscription.id;
      const responseId = await apiReveniu.get(`/subscriptions/${subscriptionId}`);
      await new Promise(resolve => setTimeout(resolve, 5000 + Math.random() * 1000));
      const responsePayments = await apiReveniu.get(`/subscriptions/${subscriptionId}/payments`);
      await new Promise(resolve => setTimeout(resolve, 5000 + Math.random() * 1000));
      const payment = responsePayments.data;
 
      const subscriptionData = responseId.data;
      queries.push(fillReveniuTablesModel(subscriptionData, payment.payments));
      count++; 
    }

    await Promise.all(queries);

    res.status(200).json({ message: 'Reveniu tables filled successfully' });
  } catch (error) {
    console.error('error filling reveniu tables:', error);
    res.status(500).json({ error: "Error in apiReveniu POST request" });
    return;
  }
}




export { getActivesByRutAndProductIdController, getByFiltersController , getBySubscription, changeAmount, changeDate,changeStatus, changeMethod, fillReveniuTables};
