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

  // Función para eliminar comillas dobles de una cadena
  const removeQuotes = (input: any) => {
    if (typeof input === "string" || input instanceof String) {
      return input.replace(/^"(.*)"$/, "$1");
    }
    return input;
  };

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

export { getByRutController, createController, upsert };
