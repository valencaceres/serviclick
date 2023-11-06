import createLogger from "../util/logger";

import * as Customer from "../models/customer";

const create = async (req: any, res: any) => {
  const {
    rut,
    name,
    paternalLastName,
    maternalLastName,
    birthDate,
    address,
    district,
    email,
    phone,
  } = req.body;

  const customerResponse = await Customer.createModel(
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone
  );

  if (!customerResponse.success) {
    createLogger.error({
      model: "customer/create",
      error: customerResponse.error,
    });
    res.status(500).json({ error: "Error creating customer" });
    return;
  }

  createLogger.info({
    controller: "customer/create",
    message: "OK",
  });

  const response = await getByRut(rut);

  if (!response.success) {
    createLogger.error({
      model: "customer/getByRutModel",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving customer" });
    return;
  }

  createLogger.info({
    controller: "customer",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const getByRutController = async (req: any, res: any) => {
  const { rut } = req.params;
  const response = await getByRut(rut);

  if (!response.success) {
    createLogger.error({
      model: "customer/getByRutModel",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving customer" });
    return;
  }

  createLogger.info({
    controller: "customer",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const getCustomerAccountByRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const response = await Customer.getCustomerAccountByRut(rut);

  if (!response.success) {
    createLogger.error({
      model: "customer/getCustomerAccountByRut",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving customer account" });
    return;
  }

  createLogger.info({
    controller: "customer",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const updateCustomerAccount = async (req: any, res: any) => {
  const { rut, bank, account_number } = req.body;
  const response = await Customer.updateCustomerAccount(
    rut,
    bank,
    account_number
  );
  if (!response?.success) {
    createLogger.error({
      model: "customer/updateCustomerAccount",
      error: response?.error,
    });
    res.status(500).json({ error: "Error updating customer account" });
    return;
  }

  createLogger.info({
    controller: "customer",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const getByRutOrName = async (req: any, res: any) => {
  const { rut, name, records, page } = req.query;
  const response = await Customer.getByRutOrName(rut, name, records, page);

  if (!response.success) {
    createLogger.error({
      model: "customer/getByRutOrName",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving customer" });
    return;
  }

  createLogger.info({
    controller: "customer/getByRutOrName",
    message: "OK",
  });
  res.status(200).json(response.data);
};

export {
  create,
  getByRutController,
  getCustomerAccountByRut,
  updateCustomerAccount,
  getByRutOrName,
};

const getByRut = async (rut: string) => {
  const response = await Customer.getByRutModel(rut);

  if (!response.success) {
    return {
      success: false,
      error: response.error,
    };
  }

  return {
    success: true,
    data: response.data,
  };
};
