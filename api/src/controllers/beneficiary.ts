import createLogger from "../util/logger";

import { getByRutModel, createModel } from "../models/beneficiary";

const getByRutController = async (req: any, res: any) => {
  const { rut } = req.params;
  const response = await getByRutModel(rut);

  if (!response.success) {
    createLogger.error({
      model: "beneficiary/getByRutModel",
      error: response.error,
    });
    res.status(500).json({ error: response.error });
    return;
  }

  createLogger.info({
    controller: "beneficiary",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const createController = async (req: any, res: any) => {
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
    relationship,
  } = req.body;
  const response = await createModel(
    rut,
    name,
    paternalLastName,
    maternalLastName,
    birthDate,
    address,
    district,
    email,
    phone,
    relationship
  );

  if (!response.success) {
    createLogger.error({
      model: "beneficiary/createModel",
      error: response.error,
    });
    res.status(500).json({ error: response.error });
    return;
  }

  createLogger.info({
    controller: "beneficiary",
    message: "OK",
  });
  res.status(200).json(response.data);
};

export { getByRutController, createController };
