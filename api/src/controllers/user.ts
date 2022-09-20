import createLogger from "../util/logger";

import * as User from "../models/user";
import * as Person from "../models/person";

type BeneficiaryT = {
  id: string;
  rut: string;
  name: string;
  paternallastname: string;
  maternallastname: string;
  email: string;
  phone: string;
};

type ProductT = {
  id: string;
  family_icon: string;
  family_name: string;
  name: string;
  price: number;
  frequency_code: string;
  beneficiaries: BeneficiaryT[];
};

type LeadT = {
  lead_id: string;
  customer_id: string;
  company_id: string;
  subscription_id: string;
  products: ProductT[];
};

type UserInsuredT = {
  id: string;
  rut: string;
  name: string;
  paternallastname: string;
  maternallastname: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  leads: LeadT[];
};

const create = async (req: any, res: any) => {
  const { rut, name, paternalLastName, maternalLastName, email, phone } =
    req.body;
  const personResponse = await Person.create(
    rut,
    name,
    paternalLastName,
    maternalLastName,
    email,
    phone
  );

  if (!personResponse.success) {
    createLogger.error({
      model: "person/create",
      error: personResponse.error,
    });
    res.status(500).json({ error: personResponse.error });
    return;
  }

  const { id } = personResponse.data;
  const userResponse = await User.create(id, email);

  if (!userResponse.success) {
    createLogger.error({
      model: "user/create",
      error: userResponse.error,
    });
    res.status(500).json({ error: userResponse.error });
    return;
  }

  createLogger.info({
    controller: "user/create",
    message: "OK",
  });
  res.status(200).json(userResponse.data);
};

const assignPassword = async (req: any, res: any) => {
  const { id, password } = req.body;

  const result = await User.assignPassword(id, password);
  if (!result.success) {
    createLogger.error({
      model: "user/assignPassword",
      error: result.error,
    });
    res.status(500).json({ error: result.error });
    return;
  }

  createLogger.info({
    controller: "user/assignPassword",
    message: "OK",
  });
  res.status(200).json(result);
};

const validate = async (req: any, res: any) => {
  const result = await User.validate(req.body);
  if (!result.success) {
    createLogger.error({
      model: "user/validate",
      error: result.error,
    });
    res.status(500).json({ error: result.error });
    return;
  }

  if (!result.data.isValid) {
    createLogger.error({
      model: "user",
      error: "User not valid",
    });
    res.status(403).json({ error: "User not valid" });
    return;
  }

  createLogger.info({
    controller: "user/validate",
    message: "OK",
  });
  res.status(200).json(result.data);
};

export { create, assignPassword, validate };
