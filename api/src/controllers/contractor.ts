import createLogger from "../util/logger";
import * as Contractor from "../models/contractor";
import * as Customer from "../models/customer";
import * as Company from "../models/company";

const create = async (req: any, res: any) => {
  const {
    type,
    rut,
    name,
    companyName,
    legalRepresentative,
    line,
    paternalLastName,
    maternalLastName,
    birthDate,
    address,
    district,
    email,
    phone,
  } = req.body;

  const contractorResponse =
    type == "P"
      ? await Customer.createModel(
          rut,
          name,
          paternalLastName,
          maternalLastName,
          birthDate,
          address,
          district,
          email,
          phone
        )
      : await Company.createModel(
          rut,
          companyName,
          legalRepresentative,
          line,
          address,
          district,
          email,
          phone
        );

  if (!contractorResponse.success) {
    createLogger.error({
      model: "contractor/create",
      error: contractorResponse.error,
    });
    res.status(500).json({ error: contractorResponse.error });
    return;
  }

  createLogger.info({
    controller: "contractor/create",
    message: "OK",
  });
  res.status(200).json({ type, ...contractorResponse.data });
};

const getAll = async (req: any, res: any) => {
  const { contractorType, active, nameLike } = req.body;

  const contractorResponse = await Contractor.getAll(
    contractorType,
    active,
    nameLike
  );

  if (!contractorResponse.success) {
    createLogger.error({
      model: "contractor/getAll",
      error: contractorResponse.error,
    });
    res.status(500).json({ error: contractorResponse.error });
    return;
  }

  createLogger.info({
    controller: "contractor/getAll",
    message: "OK",
  });
  res.status(200).json(contractorResponse.data);
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;

  const contractorResponse = await Contractor.getById(id);

  if (!contractorResponse.success) {
    createLogger.error({
      model: "contractor/getById",
      error: contractorResponse.error,
    });
    res.status(500).json({ error: contractorResponse.error });
    return;
  }

  createLogger.info({
    controller: "contractor/getById",
    message: "OK",
  });
  res.status(200).json(contractorResponse.data);
};

const getByRut = async (req: any, res: any) => {
  const { rut, type } = req.params;

  const contractorResponse =
    type === "P"
      ? await Customer.getByRutModel(rut)
      : await Company.getByRutModel(rut);

  if (!contractorResponse.success) {
    createLogger.error({
      model: "contractor/getByRut",
      error: contractorResponse.error,
    });
    res.status(500).json({ error: contractorResponse.error });
    return;
  }

  createLogger.info({
    controller: "contractor/getByRut",
    message: "OK",
  });
  res.status(200).json({ type, ...contractorResponse.data });
};

export { create, getAll, getById, getByRut };
