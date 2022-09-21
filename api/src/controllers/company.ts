import createLogger from "../util/logger";

import {
  getByRutModel,
  createModel,
  getProductsAndInsuredByIdModel,
} from "../models/company";

const getByRutController = async (req: any, res: any) => {
  const { rut } = req.params;
  const response = await getByRutModel(rut);

  if (!response.success) {
    createLogger.error({
      model: "company/getByRutModel",
      error: response.error,
    });
    res.status(500).json({ error: response.error });
    return;
  }

  createLogger.info({
    controller: "company",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const createController = async (req: any, res: any) => {
  const { id } = req.params;
  const {
    rut,
    companyName,
    legalRepresentative,
    line,
    address,
    district,
    email,
    phone,
  } = req.body;
  const response = await createModel(
    rut,
    companyName,
    legalRepresentative,
    line,
    address,
    district,
    email,
    phone
  );

  if (!response.success) {
    createLogger.error({
      model: "company/createModel",
      error: response.error,
    });
    res.status(500).json({ error: response.error });
    return;
  }

  createLogger.info({
    controller: "company",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const getProductsAndInsuredByIdController = async (req: any, res: any) => {
  const { id } = req.params;
  const response = await getProductsAndInsuredByIdModel(id);

  if (!response.success) {
    createLogger.error({
      model: "company/getProductsAndInsuredByIdModel",
      error: response.error,
    });
    res.status(500).json({ error: response.error });
    return;
  }

  createLogger.info({
    controller: "company/getProductsAndInsuredByIdController",
    message: "OK",
  });
  res.status(200).json(response.data);
};

export {
  getByRutController,
  createController,
  getProductsAndInsuredByIdController,
};
