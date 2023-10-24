import createLogger from "../util/logger";

import * as BeneficiaryModel from "../models/beneficiary";

const getByRutController = async (req: any, res: any) => {
  const { rut } = req.params;
  const response = await BeneficiaryModel.getByRutModel(rut);

  if (!response.success) {
    createLogger.error({
      model: "beneficiary/getByRutModel",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving beneficiary" });
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
  const response = await BeneficiaryModel.createModel(
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
    res.status(500).json({ error: "Error creating beneficiary" });
    return;
  }

  createLogger.info({
    controller: "beneficiary",
    message: "OK",
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

  const response = await BeneficiaryModel.upsert(
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
      model: "beneficiary/upsert",
      error: response.error,
    });
    res.status(500).json({ error: "Error creating beneficiary" });
    return;
  }

  createLogger.info({
    controller: "beneficiary/upsert",
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

export { getByRutController, createController, upsert };
