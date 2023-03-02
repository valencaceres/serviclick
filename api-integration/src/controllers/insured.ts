import createLogger from "../utils/logger";

import * as Person from "../models/person";
import * as Insured from "../models/insured";

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
    birthDate,
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

  const insuredResponse = await Insured.create(
    personResponse.data.id,
    birthDate
  );

  if (!insuredResponse.success) {
    createLogger.error({
      model: "insured/create",
      error: insuredResponse.error,
    });
    res.status(500).json({ error: insuredResponse.error });
    return;
  }

  createLogger.info({
    controller: "insured/create",
    message: "OK",
  });

  const response = await Insured.getByRut(rut);

  if (!response.success) {
    createLogger.error({
      model: "insured/getByRut",
      error: response.error,
    });
    res.status(500).json({ error: response.error });
    return;
  }

  createLogger.info({
    controller: "insured",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const deleteByRut = async (req: any, res: any) => {
  const { rut } = req.params;

  const responseInsured = await Insured.getByRut(rut);

  if (!responseInsured.success) {
    createLogger.error({
      model: "insured/getByRut",
      error: responseInsured.error,
    });
    res.status(500).json({ error: responseInsured.error });
    return;
  }

  const responseDelete = await Insured.deleteById(responseInsured.data.id);

  if (!responseDelete.success) {
    createLogger.error({
      model: "insured/deleteById",
      error: responseDelete.error,
    });
    res.status(500).json({ error: responseDelete.error });
    return;
  }

  createLogger.info({
    controller: "insured",
    message: "OK",
  });
  res.status(200).json(responseDelete.data);
};

const getByRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const response = await Insured.getByRut(rut);

  if (!response.success) {
    createLogger.error({
      model: "insured/getByRut",
      error: response.error,
    });
    res.status(500).json({ error: response.error });
    return;
  }

  createLogger.info({
    controller: "insured",
    message: "OK",
  });
  res.status(200).json(response.data);
};

export { create, deleteByRut, getByRut };
