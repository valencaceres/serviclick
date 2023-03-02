import createLogger from "../utils/logger";

import * as Person from "../models/person";
import * as Customer from "../models/customer";

const create = async (req: any, res: any) => {
  const {
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    country_code,
    email,
    phone,
  } = req.body;

  const personResponse = await Person.create(
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    country_code,
    email,
    phone
  );

  if (!personResponse.success) {
    createLogger.error({
      model: "person/create",
      error: personResponse.error,
    });
    res.status(500).json({ error: personResponse.error });
    return;
  }

  const customerResponse = await Customer.create(personResponse.data.id);

  if (!customerResponse.success) {
    createLogger.error({
      model: "customer/create",
      error: customerResponse.error,
    });
    res.status(500).json({ error: customerResponse.error });
    return;
  }

  createLogger.info({
    controller: "customer/create",
    message: "OK",
  });

  const response = await Customer.getByRut(rut);

  if (!response.success) {
    createLogger.error({
      model: "customer/getByRut",
      error: response.error,
    });
    res.status(500).json({ error: response.error });
    return;
  }

  createLogger.info({
    controller: "customer",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const deleteByRut = async (req: any, res: any) => {
  const { rut } = req.params;

  const responseCustomer = await Customer.getByRut(rut);

  if (!responseCustomer.success) {
    createLogger.error({
      model: "customer/getByRut",
      error: responseCustomer.error,
    });
    res.status(500).json({ error: responseCustomer.error });
    return;
  }

  const responseDelete = await Customer.deleteById(responseCustomer.data.id);

  if (!responseDelete.success) {
    createLogger.error({
      model: "customer/deleteById",
      error: responseDelete.error,
    });
    res.status(500).json({ error: responseDelete.error });
    return;
  }

  createLogger.info({
    controller: "customer",
    message: "OK",
  });
  res.status(200).json(responseDelete.data);
};

const getByRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const response = await Customer.getByRut(rut);

  if (!response.success) {
    createLogger.error({
      model: "customer/getByRut",
      error: response.error,
    });
    res.status(500).json({ error: response.error });
    return;
  }

  createLogger.info({
    controller: "customer",
    message: "OK",
  });
  res.status(200).json(response.data);
};

export { create, deleteByRut, getByRut };
