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
    res.status(500).json({ error: partnerResponse.error });
    return;
  }

  const deleteSpecialtys = await PartnerSpecialty.deleteByPartnerId(partner_id);

  if (!deleteSpecialtys.success) {
    createLogger.error({
      model: `partnerSpecialty/deleteByPartnerId`,
      error: deleteSpecialtys.error,
    });
    res.status(500).json({ error: deleteSpecialtys.error });
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
      res.status(500).json({ error: addSpecialty.error });
      return;
    }
  }

  createLogger.info({
    controller: `partner/create`,
    message: `Partner created successfully`,
  });

  const responseGet = await functionGetById(partner_id);

  if (!responseGet.success) {
    res.status(500).json({ error: responseGet.error });
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
    res.status(500).json({ error: partnerResponse.error });
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
    res.status(500).json({ error: responseGet.error });
    return;
  }

  console.log(responseGet.data);

  res.status(200).json(responseGet.data);
};

const getFamilies = async (req: any, res: any) => {
  const partnerResponse = await Partner.getFamilies();

  if (!partnerResponse.success) {
    createLogger.error({
      model: `partner/getFamilies`,
      error: partnerResponse.error,
    });
    res.status(500).json({ error: partnerResponse.error });
    return;
  }

  console.log(partnerResponse);
  createLogger.info({
    controller: `partner/getFamilies`,
    message: `OK - Get Families`,
  });

  res.status(200).json(partnerResponse.data);
};

export { create, getAll, getById, getFamilies };

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
