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

  const beneficiaryUpsert = response.data.beneficiary_upsert;

  const valuesArray = beneficiaryUpsert.replace(/^\(|\)$/g, "").split(",");
  const data = {
    id: valuesArray[0],
    rut: valuesArray[1],
    name: valuesArray[2],
    paternalLastName: valuesArray[3],
    maternalLastName: valuesArray[4],
    address: valuesArray[5],
    district: valuesArray[6],
    email: valuesArray[7],
    phone: valuesArray[8],
    birthDate: valuesArray[9],
  };

  res.status(200).json(data);
};

export { getByRutController, createController, upsert };
