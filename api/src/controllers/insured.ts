import createLogger from "../util/logger";

import { getByRutModel, createModel } from "../models/insured";

const getByRutController = async (req: any, res: any) => {
  const { rut } = req.params;
  const response = await getByRutModel(rut);

  if (!response.success) {
    createLogger.error({
      model: "insured/getByRutModel",
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

const createController = async (req: any, res: any) => {
  const { id } = req.params;
  const {
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone,
  } = req.body;
  const response = await createModel(
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone
  );

  if (!response.success) {
    createLogger.error({
      model: "insured/createModel",
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

export { getByRutController, createController };
