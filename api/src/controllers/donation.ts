import axios from "axios";

import config from "../util/config";

import createLogger from "../util/logger";

import * as DonorModel from "../models/donor";
import {
  createModel,
  getByIdModel,
  getBySubscriptionIdModel,
} from "../models/donation";

const createController = async (req: any, res: any) => {
  const { agent_id, donor, price, product } = req.body;

  // Creación del donador

  // const donorResponse = await DonorModel.createModel(
  //   rut: donor.rut,
  //   name: donor.name,
  //   paternalLastName: donor.paternalLastName,
  //   maternalLastName: donor.maternalLastName,
  //   birthDate: donor.birthDate,
  //   address: donor.address,
  //   district: donor.district,
  //   email: donor.email,
  //   phone: donor.phone
  // );

  // if (!insuredResponse.success) {
  //   createLogger.error({
  //     model: "lead/createInsuredModel",
  //     error: insuredResponse.error,
  //   });
  //   res
  //     .status(500)
  //     .json({ error: "createInsuredModel: " + insuredResponse.error });
  //   return;
  // }

  const response = await createModel(
    donor.donor_id,
    product.id,
    price,
    agent_id
  );

  if (!response.success) {
    createLogger.error({
      model: "donation/createModel",
      error: response.error,
    });
    res.status(500).json({ error: "Error creating donation" });
    return;
  }

  // Creación de lead

  // const leadResponse = await createLeadModel(
  //   customer_id,
  //   company_id,
  //   agent_id
  // );

  // if (!leadResponse.success) {
  //   createLogger.error({
  //     model: "lead/createLeadModel",
  //     error: leadResponse.error,
  //   });
  //   res.status(500).json({ error: "Error creating lead" });
  //   return;
  // }

  // const { id: lead_id, createdate } = leadResponse.data;

  const data = {
    email: donor.email,
    name: donor.name,
    amount: product.price,
    address: donor.address,
    rut: donor.rut,
    phone: donor.phone,
  };

  createLogger.info({
    model: config.reveniu.URL.subscription,
    body: {
      plan_id: product.productPlan_id,
      field_values: data,
    },
  });

  const subscriptionReveniuResponse = await axios.post(
    config.reveniu.URL.subscription,
    {
      plan_id: product.productPlan_id,
      field_values: data,
    },
    {
      headers: config.reveniu.apiKey,
    }
  );

  const { id: subscription_id } = subscriptionReveniuResponse.data;

  // Registro de webhook

  // const webhookResponse = await axios.post(config.webHook.URL.reveniu, {
  //   data: {
  //     data: {
  //       subscription_id,
  //       lead_id,
  //     },
  //   },
  // });

  // Data a desplegar

  // const leadResponseData = {
  //   id: donation_id,
  //   date: createdate,
  //   donor:{
  //           id: donor.id,
  //           rut: donor.rut,
  //           name: donor.name,
  //           paternalLastName: donor.paternallastname,
  //           maternalLastName: donor.maternallastname,
  //           address: donor.address,
  //           district: donor.district,
  //           email: donor.email,
  //           phone: donor.phone,
  //   },
  //   product: {
  //     id: leadProductResponse.data.product_id,
  //     name: name,
  //     price: leadProductResponse.data.price,
  //     currency_code: leadProductResponse.data.currency_code,
  //     frequency_code: leadProductResponse.data.frequency_code,
  //     productPlan_id: leadProductResponse.data.productplan_id,
  //   },
  //   subscription_id,
  //   isActive: true,
  // };

  createLogger.info({
    controller: "donation/createController",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const getByIdController = async (req: any, res: any) => {
  const { id } = req.params;
  const response = await getByIdModel(id);

  if (!response.success) {
    createLogger.error({
      model: "donation/getByIdModel",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving donation" });
    return;
  }

  createLogger.info({
    controller: "donation/getByIdController",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const getBySubscriptionIdController = async (req: any, res: any) => {
  const { subscription_id } = req.params;
  const response = await getBySubscriptionIdModel(subscription_id);

  if (!response.success) {
    createLogger.error({
      model: "donation/getBySubscriptionIdModel",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving donation" });
    return;
  }

  createLogger.info({
    controller: "donation/getBySubscriptionIdController",
    message: "OK",
  });
  res.status(200).json(response.data);
};

export { createController, getByIdController, getBySubscriptionIdController };
