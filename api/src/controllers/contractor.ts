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
          address,
          district,
          email,
          phone
        )
      : await Company.create(
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
    res.status(500).json({ error: "Error creating contractor" });
    return;
  }

  createLogger.info({
    model: "contractor/create",
    message: "Contractor created successfully",
  });

  res.status(200).json({
    message: "Contractor created successfully",
    data: contractorResponse.data,
  });
};

const getAll = async (req: any, res: any) => {
  const { contractorType, active, rut, nameLike } = req.body;

  const contractorResponse = await Contractor.getAll(
    contractorType,
    rut,
    active,
    nameLike
  );

  if (!contractorResponse.success) {
    createLogger.error({
      model: "contractor/getAll",
      error: contractorResponse.error,
    });
    res.status(500).json({ error: "Error retrieving contractors" });
    return;
  }

  createLogger.info({
    controller: "contractor/getAll",
    message: "OK",
  });
  res.status(200).json(contractorResponse.data);
};

const getByRut = async (req: any, res: any) => {
  const { rut, type } = req.params;

  const contractorResponse =
    type === "P"
      ? await Customer.getByRutModel(rut)
      : await Company.getByRut(rut);

  if (!contractorResponse.success) {
    createLogger.error({
      model: "contractor/getByRut",
      error: contractorResponse.error,
    });
    res.status(500).json({ error: "Error retrieving contractor" });
    return;
  }

  createLogger.info({
    controller: "contractor/getByRut",
    message: "OK",
  });
  res.status(200).json({ type, ...contractorResponse.data });
};

const getSubscriptionsById = async (req: any, res: any) => {
  const { id } = req.params;

  const contractorResponse = await Contractor.getSubscriptionsById(id);

  if (!contractorResponse.success) {
    createLogger.error({
      model: "contractor/getSubscriptionsById",
      error: contractorResponse.error,
    });
    res.status(500).json({ error: "Error retrieving subscriptions" });
    return;
  }

  createLogger.info({
    controller: "contractor/getSubscriptionsById",
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
    res.status(500).json({ error: "Error retrieving contractor" });
    return;
  }

  const subscriptionResponse = await Contractor.getSubscriptionsById(id);

  if (!subscriptionResponse.success) {
    createLogger.error({
      model: "contractor/getSubscriptionsById",
      error: subscriptionResponse.error,
    });
    res.status(500).json({ error: "Error retrieving subscription" });
    return;
  }

  const paymentResponse = await Contractor.getPaymentById(id);

  if (!paymentResponse.success) {
    createLogger.error({
      model: "contractor/getPaymentById",
      error: paymentResponse.error,
    });
    res.status(500).json({ error: "Error retrieving payment" });
    return;
  }

  const data = {
    ...contractorResponse.data,
    subscriptions: [...subscriptionResponse.data],
    payment: [...paymentResponse.data],
  };

  createLogger.info({
    controller: "contractor/getById",
    message: "OK",
  });
  res.status(200).json(data);
};

const getSubscriptionById = async (req: any, res: any) => {
  const { id } = req.params;

  const suscriptionResponse = await Contractor.getSubscriptionById(id);

  if (!suscriptionResponse.success) {
    createLogger.error({
      model: "model/getSubscriptionById",
      error: suscriptionResponse.error,
    });
    res.status(500).json({ error: "Error retrieving subscription" });
    return;
  }

  const insuredResponse = await Contractor.getInsuredBySubscriptionId(id);

  if (!insuredResponse.success) {
    createLogger.error({
      model: "model/getInsuredBySubscriptionId",
      error: insuredResponse.error,
    });
    res.status(500).json({ error: "Error retrieving insured" });
    return;
  }

  const data = { ...suscriptionResponse.data, insured: insuredResponse.data };

  createLogger.info({
    controller: "contractor/getSubscriptionById",
    message: "OK",
  });
  res.status(200).json(data);
};

const getInsuredBySubscriptionId = async (req: any, res: any) => {
  const { id } = req.params;

  const suscriptionResponse = await Contractor.getInsuredBySubscriptionId(id);

  if (!suscriptionResponse.success) {
    createLogger.error({
      model: "contractor/getInsuredBySubscriptionId",
      error: suscriptionResponse.error,
    });
    res.status(500).json({ error: "Error retrieving insured" });
    return;
  }

  createLogger.info({
    controller: "contractor/getInsuredBySubscriptionId",
    message: "OK",
  });
  res.status(200).json(suscriptionResponse.data);
};

const getPaymentById = async (req: any, res: any) => {
  const { id } = req.params;

  const suscriptionResponse = await Contractor.getPaymentById(id);

  if (!suscriptionResponse.success) {
    createLogger.error({
      model: "model/getPaymentById",
      error: suscriptionResponse.error,
    });
    res.status(500).json({ error: "Error retrieving payment" });
    return;
  }

  createLogger.info({
    controller: "contractor/getPaymentById",
    message: "OK",
  });
  res.status(200).json(suscriptionResponse.data);
};

const getProductsByContractor = async (req: any, res: any) => {
  const { id } = req.params;

  const contractorResponse = await Contractor.getProductsByContractor(id);

  if (!contractorResponse.success) {
    createLogger.error({
      model: "contractor/getProductsByContractor",
      error: contractorResponse.error,
    });
    res.status(500).json({ error: "Error retrieving products" });
    return;
  }

  createLogger.info({
    controller: "contractor/getProductsByContractor",
    message: "OK",
  });
  res.status(200).json(contractorResponse.data);
};

export {
  create,
  getAll,
  getById,
  getByRut,
  getSubscriptionsById,
  getSubscriptionById,
  getInsuredBySubscriptionId,
  getPaymentById,
  getProductsByContractor,
};
