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

  const data = {
    rut: response.data.rut,
    name: response.data.name,
    paternalLastName: response.data.paternallastname,
    maternalLastName: response.data.maternallastname,
    address: response.data.address,
    district: response.data.district,
    email: response.data.email,
    phone: response.data.phone,
    birthDate: response.data.birthdate,
  };

  res.status(200).json(data);
};

export { getByRut, getProfile, create, getById, upsert };
