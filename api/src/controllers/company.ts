import createLogger from "../util/logger";

import * as Company from "../models/company";

const getByRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const response = await Company.getByRut(rut);

  if (!response.success) {
    createLogger.error({
      model: "company/getByRutModel",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving company" });
    return;
  }

  createLogger.info({
    controller: "company",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const create = async (req: any, res: any) => {
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
  const response = await Company.create(
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
    res.status(500).json({ error: "Error creating company" });
    return;
  }

  createLogger.info({
    controller: "company",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const getProductsAndInsuredById = async (req: any, res: any) => {
  const { id } = req.params;
  const response = await Company.getProductsAndInsuredById(id);

  if (!response.success) {
    createLogger.error({
      model: "company/getProductsAndInsuredByIdModel",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving products and insured" });
    return;
  }

  createLogger.info({
    controller: "company/getProductsAndInsuredById",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const getAll = async (req: any, res: any) => {
  const companyResponse = await Company.getAll();

  if (!companyResponse.success) {
    createLogger.error({
      model: "company/getAll",
      error: companyResponse.error,
    });
    res.status(500).json({ error: "Error retrieving companies" });
    return;
  }

  res.status(200).json(companyResponse.data);
};

const getLeadsByRut = async (req: any, res: any) => {
  const { id } = req.params;
  const response = await Company.getLeadsByRut(id);

  if (!response.success) {
    createLogger.error({
      model: "company/getLeadsByRut",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving leads" });
    return;
  }

  createLogger.info({
    controller: "company/getLeadsByRut",
    message: "OK",
  });
  res.status(200).json(response.data);
};

export { getByRut, create, getProductsAndInsuredById, getAll, getLeadsByRut };
