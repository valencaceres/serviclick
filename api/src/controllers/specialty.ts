import createLogger from "../util/logger";

import * as Specialty from "../models/specialty";

const createSpecialty = async (req: any, res: any) => {
  const { name, family_id } = req.body;

  const specialtyResponse = await Specialty.createSpecialty(family_id, name);

  if (!specialtyResponse.success) {
    createLogger.error({
      model: "specialty/createSpecialty",
      error: specialtyResponse.error,
    });
    res.status(500).json({ error: "Error creating specialty" });
    return;
  }

  createLogger.info({
    controller: "specialty",
    message: "OK",
  });
  res.status(200).json(specialtyResponse.data);
};

const updateSpecialty = async (req: any, res: any) => {
  const { id } = req.params;
  const { name, family_id } = req.body;

  const specialtyResponse = await Specialty.updateSpecialty(
    id,
    family_id,
    name
  );
  if (!specialtyResponse.success) {
    createLogger.error({
      model: "specialty/updateSpecialty",
      error: specialtyResponse.error,
    });
    res.status(500).json({ error: "Error updating specialty" });
    return;
  }

  createLogger.info({
    controller: "specialty",
    message: "OK",
  });
  res.status(200).json(specialtyResponse.data);
};

const deleteSpecialty = async (req: any, res: any) => {
  const { id } = req.params;
  const specialtyResponse = await Specialty.deleteSpecialty(id);

  if (!specialtyResponse.success) {
    createLogger.error({
      model: "specialty/deleteSpecialty",
      error: specialtyResponse.error,
    });
    res.status(500).json({ error: "Error deleting specialty" });
    return;
  }

  createLogger.info({
    controller: "specialty",
    message: "OK",
  });
  res.status(200).json(specialtyResponse.data);
};

const getAllSpecialties = async (req: any, res: any) => {
  const specialtyResponse = await Specialty.getAllSpecialties();

  if (!specialtyResponse.success) {
    createLogger.error({
      model: "specialty/listFamilies",
      error: specialtyResponse.error,
    });
    res.status(500).json({ error: "Error retrieving specialties" });
    return;
  }

  createLogger.info({
    controller: "specialty",
    message: "OK",
  });
  res.status(200).json(specialtyResponse.data);
};

const getSpecialty = async (req: any, res: any) => {
  const { id } = req.params;
  const specialtyResponse = await Specialty.getSpecialty(id);

  if (!specialtyResponse.success) {
    createLogger.error({
      model: "specialty/getSpecialty",
      error: specialtyResponse.error,
    });
    res.status(500).json({ error: "Error retrieving specialty" });
    return;
  }

  createLogger.info({
    controller: "specialty",
    message: "OK",
  });
  res.status(200).json(specialtyResponse.data);
};

const getSpecialitiesByAssistance = async (req: any, res: any) => {
  const { id, assistance_id } = req.params;
  const specialistResponse = await Specialty.getSpecialitiesByAssistance(
    id,
    assistance_id
  );

  if (!specialistResponse.success) {
    createLogger.error({
      model: "specialist/getSpecialitiesByAssistance",
      error: specialistResponse.error,
    });
    res.status(500).json({ error: "Error retrieving specialist" });
    return;
  }

  createLogger.info({
    controller: "specialist/getSpecialitiesByAssistance",
    message: "OK",
  });
  res.status(200).json(specialistResponse.data);
};

const getSpecialtiesByPartner = async (req: any, res: any) => {
  const { id, assistance_id } = req.params;
  const specialistResponse = await Specialty.getSpecialitiesByPartner(
    id,
    assistance_id
  );

  if (!specialistResponse.success) {
    createLogger.error({
      model: "specialist/getSpecialtiesByPartner",
      error: specialistResponse.error,
    });
    res.status(500).json({ error: "Error retrieving specialist" });
    return;
  }

  createLogger.info({
    controller: "specialist/getSpecialtiesByPartner",
    message: "OK",
  });
  res.status(200).json(specialistResponse.data);
};

const getSpecialtiesByFamilyId = async (req: any, res: any) => {
  const { family_id } = req.params;
  const specialtyResponse = await Specialty.getSpecialtiesByFamilyId(family_id);

  if (!specialtyResponse.success) {
    createLogger.error({
      model: "specialty/getSpecialtiesByFamilyId",
      error: specialtyResponse.error,
    });
    res.status(500).json({ error: "Error retrieving specialties" });
    return;
  }

  createLogger.info({
    controller: "specialty/getSpecialtiesByFamilyId",
    message: "OK",
  });
  res.status(200).json(specialtyResponse.data);
};

const getFamilies = async (req: any, res: any) => {
  const specialtyResponse = await Specialty.getFamilies();

  if (!specialtyResponse.success) {
    createLogger.error({
      model: "specialty/getFamilies",
      error: specialtyResponse.error,
    });
    res.status(500).json({ error: "Error retrieving families" });
    return;
  }

  createLogger.info({
    controller: "specialty/getFamilies",
    message: "OK",
  });
  res.status(200).json(specialtyResponse.data);
};

export {
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
  getSpecialty,
  getAllSpecialties,
  getSpecialtiesByFamilyId,
  getFamilies,
  getSpecialitiesByAssistance,
  getSpecialtiesByPartner,
};
