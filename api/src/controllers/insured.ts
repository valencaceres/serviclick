import createLogger from "../util/logger";

import * as Insured from "../models/insured";

const getByRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const response = await Insured.getByRut(rut);

  if (!response.success) {
    createLogger.error({
      model: "insured/getByRut",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving insured" });
    return;
  }

  createLogger.info({
    controller: "insured",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const getProfile = async (req: any, res: any) => {
  const { rut } = req.params;
  const response = await Insured.getProfile(rut);

  if (!response.success) {
    createLogger.error({
      model: "insured/getProfile",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving insured profile" });
    return;
  }

  createLogger.info({
    controller: "insured",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const create = async (req: any, res: any) => {
  const { id } = req.params;
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
  const response = await Insured.create(
    rut,
    name,
    paternalLastName,
    maternalLastName,
    birthDate,
    address,
    district,
    email,
    phone
  );

  if (!response.success) {
    createLogger.error({
      model: "insured/create",
      error: response.error,
    });
    res.status(500).json({ error: "Error creating insured" });
    return;
  }

  createLogger.info({
    controller: "insured",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const response = await Insured.getById(id);

  if (!response.success) {
    createLogger.error({
      model: "insured/getById",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving insured" });
    return;
  }

  createLogger.info({
    controller: "insured/getById",
    message: "Insured found",
  });
  res.status(200).json(response.data);
};

const upsert = async (req: any, res: any) => {
  const {
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone,
    birthDate,
  } = req.body;

  const response = await Insured.upsert(
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone,
    birthDate
  );

  if (!response.success) {
    createLogger.error({
      model: "insured/upsert",
      error: response.error,
    });
    res.status(500).json({ error: "Error creating insured" });
    return;
  }
  createLogger.info({
    controller: "insured/upsert",
    message: "OK",
  });
  const insuredUpsertString = response.data.insured_upsert;

  // Función para eliminar comillas dobles de una cadena
  const removeQuotes = (input: any) => {
    if (typeof input === "string" || input instanceof String) {
      return input.replace(/^"(.*)"$/, "$1");
    }
    return input;
  };

  const valuesArray = insuredUpsertString.replace(/^\(|\)$/g, "").split(",");

  const sanitizedValuesArray = valuesArray.map(removeQuotes);

  const data = {
    id: sanitizedValuesArray[0],
    rut: sanitizedValuesArray[1],
    name: sanitizedValuesArray[2],
    paternalLastName: sanitizedValuesArray[3],
    maternalLastName: sanitizedValuesArray[4],
    address: sanitizedValuesArray[5],
    district: sanitizedValuesArray[6],
    email: sanitizedValuesArray[7],
    phone: sanitizedValuesArray[8],
    birthDate: sanitizedValuesArray[9],
  };
  res.status(200).json(data);
};

const getByRutOrName = async (req: any, res: any) => {
  const { rut, name, records, page } = req.query;
  const response = await Insured.getByRutOrName(rut, name, records, page);

  if (!response.success) {
    createLogger.error({
      model: "insured/getByRutOrName",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving insured" });
    return;
  }

  createLogger.info({
    controller: "insured/getByRutOrName",
    message: "OK",
  });
  res.status(200).json(response.data);
};

export { getByRut, getProfile, create, getById, upsert, getByRutOrName };
