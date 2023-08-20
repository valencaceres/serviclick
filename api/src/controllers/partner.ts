import createLogger from "../util/logger";

import * as Partner from "../models/partner";
import * as PartnerSpecialty from "../models/partnerSpecialty";

import { IPartner } from "../interfaces/partner";

const create = async (req: any, res: any) => {
  const {
    rut,
    name,
    legalrepresentative,
    line,
    address,
    district,
    email,
    phone,
    specialties,
  }: IPartner = req.body;

  const partnerResponse = await Partner.create(
    rut,
    name,
    legalrepresentative,
    line,
    address,
    district,
    email,
    phone
  );

  const { id: partner_id } = partnerResponse.data;

  if (!partnerResponse.success) {
    createLogger.error({
      model: `partner/create`,
      error: partnerResponse.error,
    });
    res.status(500).json({ error: "Error creating partner" });
    return;
  }

  const deleteSpecialties = await PartnerSpecialty.deleteByPartnerId(
    partner_id
  );

  if (!deleteSpecialties.success) {
    createLogger.error({
      model: `partnerSpecialty/deleteByPartnerId`,
      error: deleteSpecialties.error,
    });
    res.status(500).json({ error: "Error deleting partner specialty" });
    return;
  }

  for (const specialty of specialties) {
    const addSpecialty = await PartnerSpecialty.create(
      partner_id,
      specialty.id
    );

    if (!addSpecialty.success) {
      createLogger.error({
        model: `partnerSpecialty/create`,
        error: addSpecialty.error,
      });
      res.status(500).json({ error: "Error creating partner specialty" });
      return;
    }
  }

  createLogger.info({
    controller: `partner/create`,
    message: `Partner created successfully`,
  });

  const responseGet = await functionGetById(partner_id);

  if (!responseGet.success) {
    res.status(500).json({ error: "Error retrieving partner" });
    return;
  }

  res.status(200).json(responseGet.data);
};

const getAll = async (req: any, res: any) => {
  const partnerResponse = await Partner.getAll();

  if (!partnerResponse.success) {
    createLogger.error({
      model: `partner/getAll`,
      error: partnerResponse.error,
    });
    res.status(500).json({ error: "Error retrieving partners" });
    return;
  }

  res.status(200).json(partnerResponse.data);
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const responseGet = await functionGetById(id);

  if (!responseGet.success) {
    createLogger.error({
      model: `partner/getById`,
      error: responseGet.error,
    });
    res.status(500).json({ error: "Error retrieving partner" });
    return;
  }

  res.status(200).json(responseGet.data);
};

const getByRut = async (req: any, res: any) => {
  const { rut } = req.params;

  const partnerResponse = await Partner.getByRut(rut);

  if (!partnerResponse.success) {
    createLogger.error({
      model: `partner/getByRut`,
      error: partnerResponse.error,
    });
    res.status(500).json({ error: "Error retrieving partner" });
    return;
  }

  if (partnerResponse.error === "Partner does not exist") {
    createLogger.info({
      controller: `partner/getByRut`,
      message: `OK - Partner does not exist`,
    });
    return res.status(200).json(partnerResponse.data);
  }

  const responseGet = await functionGetById(partnerResponse.data.id);

  createLogger.info({
    controller: `partner/getByRut`,
    message: `OK - Get Partner by Rut`,
  });
  res.status(200).json(responseGet.data);
};

const getFamilies = async (req: any, res: any) => {
  const partnerResponse = await Partner.getFamilies();

  if (!partnerResponse.success) {
    createLogger.error({
      model: `partner/getFamilies`,
      error: partnerResponse.error,
    });
    res.status(500).json({ error: "Error retrieving partner families" });
    return;
  }

  createLogger.info({
    controller: `partner/getFamilies`,
    message: `OK - Get Families`,
  });

  res.status(200).json(partnerResponse.data);
};

const deletePartner: any = async (req: any, res: any) => {
  const { id } = req.params;
  const partnerResponse = await Partner.deletePartner(id);

  if (!partnerResponse.success) {
    createLogger.error({
      model: `partner/deletePartner`,
      error: partnerResponse.error,
    });
    res.status(500).json({ error: "Error deleting partner" });
    return;
  }

  createLogger.info({
    controller: `partner/deletePartner`,
    message: `OK - Partner deleted successfully`,
  });

  res.status(200).json(partnerResponse.data);
};

const getBySpecialtyId = async (req: any, res: any) => {
  const { id } = req.params;
  const partnerResponse = await Partner.getBySpecialtyId(id);

  if (!partnerResponse.success) {
    createLogger.error({
      model: `partner/getBySpecialtyId`,
      error: partnerResponse.error,
    });
    res.status(500).json({ error: "Error retrieving partner" });
    return;
  }

  createLogger.info({
    controller: `partner/getBySpecialtyId`,
    message: `OK - Get Partners by Specialty Id`,
  });

  res.status(200).json(partnerResponse.data);
};

const getByName = async (req: any, res: any) => {
  const { name } = req.params;
  const partnerResponse = await Partner.getByName(name);

  if (!partnerResponse.success) {
    createLogger.error({
      model: `partner/getByName`,
      error: partnerResponse.error,
    });
    res.status(500).json({ error: "Error retrieving partner" });
    return;
  }

  createLogger.info({
    controller: `partner/getByName`,
    message: `OK - Get Partners by Name`,
  });

  res.status(200).json(partnerResponse.data);
};

const getByFamilyId = async (req: any, res: any) => {
  const { id } = req.params;
  const partnerResponse = await Partner.getByFamilyId(id);

  if (!partnerResponse.success) {
    createLogger.error({
      model: `partner/getByFamilyId`,
      error: partnerResponse.error,
    });
    res.status(500).json({ error: "Error retrieving partner" });
    return;
  }

  createLogger.info({
    controller: `partner/getByFamilyId`,
    message: `OK - Get Partners by Family Id`,
  });

  res.status(200).json(partnerResponse.data);
};

export {
  create,
  getAll,
  getById,
  getByRut,
  getFamilies,
  deletePartner,
  getBySpecialtyId,
  getByName,
  getByFamilyId,
};

const functionGetById = async (id: string) => {
  const partnerResponse = await Partner.getById(id);

  if (!partnerResponse.success) {
    createLogger.error({
      model: `partner/getById`,
      error: partnerResponse.error,
    });
    return { success: false, error: partnerResponse.error };
  }

  const data = {
    ...partnerResponse.data,
    specialties: [],
  };

  const responseSpecialties = await PartnerSpecialty.getByPartnerId(id);

  if (!responseSpecialties.success) {
    createLogger.error({
      model: `partnerSpecialty/getByPartnerId`,
      error: responseSpecialties.error,
    });
    return { success: false, error: responseSpecialties.error };
  }

  data.specialties = responseSpecialties.data;

  return { success: true, data, error: null };
};
