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

const getSpecialtiesBySpecialist = async (req: any, res: any) => {
  const { specialist_id, assistance_id } = req.params;
  console.log(req.params);
  const specialtyResponse =
    await Specialty.getSpecialtiesBySpecialistAndAssistanceId(
      specialist_id,
      assistance_id
    );

  if (!specialtyResponse.success) {
    createLogger.error({
      model: "specialty/getSpecialtiesBySpecialist",
      error: specialtyResponse.error,
    });
    res.status(500).json({ error: "Error retrieving specialties" });
    return;
  }

  createLogger.info({
    controller: "specialty/getSpecialtiesBySpecialist",
    message: "OK",
  });
  res.status(200).json(specialtyResponse.data);
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
  getSpecialtiesBySpecialist,
};
