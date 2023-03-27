import createLogger from "../util/logger";

import * as Person from "../models/person";
import * as Specialist from "../models/specialist";
import * as SpecialistDistrict from "../models/specialistDistrict";
import * as SpecialistSpecialty from "../models/specialistSpecialty";

import { ISpecialist } from "../interfaces/specialist";

const create = async (req: any, res: any) => {
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
    specialties,
    districts,
  }: ISpecialist = req.body;

  const personResponse = await Person.create(
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

  if (!personResponse.success) {
    createLogger.error({
      model: `person/create`,
      error: personResponse.error,
    });
    res.status(500).json({ error: personResponse.error });
    return;
  }

  const { id: person_id } = personResponse.data;

  const specialistResponse = await Specialist.create(person_id);

  if (!specialistResponse.success) {
    createLogger.error({
      model: `specialist/create`,
      error: specialistResponse.error,
    });
    res.status(500).json({ error: specialistResponse.error });
    return;
  }

  const { id: specialist_id } = specialistResponse.data;

  const deleteDistricts = await SpecialistDistrict.deleteBySpecialistId(
    specialist_id
  );

  if (!deleteDistricts.success) {
    createLogger.error({
      model: "specialistDistrict/deleteBySpecialistId",
      error: deleteDistricts.error,
    });
    res.status(500).json({ error: deleteDistricts.error });
    return;
  }

  for (const district of districts) {
    const addDistrict = await SpecialistDistrict.create(
      specialist_id,
      district.id
    );

    if (!addDistrict.success) {
      createLogger.error({
        model: "specialistDistrict/create",
        error: addDistrict.error,
      });
      res.status(500).json({ error: addDistrict.error });
      return;
    }
  }

  const deleteSpecialtys = await SpecialistSpecialty.deleteBySpecialistId(
    specialist_id
  );

  if (!deleteSpecialtys.success) {
    createLogger.error({
      model: "specialistSpecialty/deleteBySpecialistId",
      error: deleteSpecialtys.error,
    });
    res.status(500).json({ error: deleteSpecialtys.error });
    return;
  }

  for (const specialty of specialties) {
    const addSpecialty = await SpecialistSpecialty.create(
      specialist_id,
      specialty.id
    );

    if (!addSpecialty.success) {
      createLogger.error({
        model: "specialistSpecialty/create",
        error: addSpecialty.error,
      });
      res.status(500).json({ error: addSpecialty.error });
      return;
    }
  }

  createLogger.info({
    controller: "specialist/create",
    message: "OK - Create",
  });

  const responseGet = await functionGetById(specialist_id);

  if (!responseGet.success) {
    res.status(500).json({ error: responseGet.error });
    return;
  }

  res.status(200).json(responseGet.data);
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const specialistResponse = await Specialist.deleteSpecialistById(id);

  if (!specialistResponse.success) {
    createLogger.error({
      model: "specialist/delete",
      error: specialistResponse.error,
    });
    res.status(500).json({ error: specialistResponse.error });
    return;
  }

  createLogger.info({
    controller: "specialist/delete",
    message: "OK",
  });
  res.status(200).json(specialistResponse.data);
};

const getAll = async (req: any, res: any) => {
  const specialistResponse = await Specialist.getAll();

  if (!specialistResponse.success) {
    createLogger.error({
      model: "specialist/getAll",
      error: specialistResponse.error,
    });
    res.status(500).json({ error: specialistResponse.error });
    return;
  }

  createLogger.info({
    controller: "specialist/getAll",
    message: "OK",
  });
  res.status(200).json(specialistResponse.data);
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const responseGet = await functionGetById(id);

  if (!responseGet.success) {
    res.status(500).json({ error: responseGet.error });
    return;
  }

  res.status(200).json(responseGet.data);
};

const getByRut = async (req: any, res: any) => {
  const { rut } = req.params;

  const specialistResponse = await Specialist.getByRut(rut);

  if (!specialistResponse.success) {
    createLogger.error({
      model: "specialist/getByRut",
      error: specialistResponse.error,
    });
    res.status(500).json({ error: specialistResponse.error });
    return;
  }

  if (specialistResponse.error === "Person does not exist") {
    createLogger.info({
      controller: "specialist/getByRut",
      message: "OK - Person does not exist",
    });
    return res.status(200).json(specialistResponse.data);
  }

  const responseGet = await functionGetById(specialistResponse.data.id);

  createLogger.info({
    controller: "specialist/getByRut",
    message: "OK - Get Specialist by Rut",
  });
  res.status(200).json(responseGet.data);
};

const getFamilies = async (req: any, res: any) => {
  const specialistResponse = await Specialist.getFamilies();

  if (!specialistResponse.success) {
    createLogger.error({
      model: "specialist/getFamilies",
      error: specialistResponse.error,
    });
    res.status(500).json({ error: specialistResponse.error });
    return;
  }

  createLogger.info({
    controller: "specialist/getFamilies",
    message: "OK",
  });
  res.status(200).json(specialistResponse.data);
};

const getAssistances = async (req: any, res: any) => {
  const { family_id } = req.params;
  const specialistResponse = await Specialist.getAssistances(family_id);

  if (!specialistResponse.success) {
    createLogger.error({
      model: "specialist/getAssistances",
      error: specialistResponse.error,
    });
    res.status(500).json({ error: specialistResponse.error });
    return;
  }

  createLogger.info({
    controller: "specialist/getAssistances",
    message: "OK",
  });
  res.status(200).json(specialistResponse.data);
};

const getByFamilyAssistance = async (req: any, res: any) => {
  const { family_id, assistance_id } = req.params;
  const specialistResponse = await Specialist.getByFamilyAssistance(
    family_id,
    assistance_id
  );

  if (!specialistResponse.success) {
    createLogger.error({
      model: "specialist/getByFamilyAssistance",
      error: specialistResponse.error,
    });
    res.status(500).json({ error: specialistResponse.error });
    return;
  }

  createLogger.info({
    controller: "specialist/getByFamilyAssistance",
    message: "OK",
  });
  res.status(200).json(specialistResponse.data);
};

const getBySpecialtyId = async (req: any, res: any) => {
  const { id } = req.params;
  const specialistResponse = await Specialist.getBySpecialtyId(id);

  if (!specialistResponse.success) {
    createLogger.error({
      model: "specialist/getBySpecialtyId",
      error: specialistResponse.error,
    });
    res.status(500).json({ error: specialistResponse.error });
    return;
  }

  createLogger.info({
    controller: "specialist/getBySpecialtyId",
    message: "OK",
  });
  res.status(200).json(specialistResponse.data);
};

const getByName = async (req: any, res: any) => {
  const { name } = req.params;
  const specialistResponse = await Specialist.getByName(name);

  if (!specialistResponse.success) {
    createLogger.error({
      model: "specialist/getByName",
      error: specialistResponse.error,
    });
    res.status(500).json({ error: specialistResponse.error });
    return;
  }

  createLogger.info({
    controller: "specialist/getByName",
    message: "OK",
  });
  res.status(200).json(specialistResponse.data);
};

const getByDistrict = async (req: any, res: any) => {
  const { district, assistance_id } = req.params;

  const specialistResponse = await Specialist.getByDistrict(
    district,
    assistance_id
  );

  if (!specialistResponse.success) {
    createLogger.error({
      model: "specialist/getByDistrict",
      error: specialistResponse.error,
    });
    res.status(500).json({ error: specialistResponse.error });

    return;
  }

  createLogger.info({
    controller: "specialist/getByDistrict",
    message: "OK",
  });

  res.status(200).json(specialistResponse.data);
};

export {
  create,
  deleteById,
  getAll,
  getById,
  getByRut,
  getFamilies,
  getAssistances,
  getByFamilyAssistance,
  getBySpecialtyId,
  getByName,
  getByDistrict,
};

const functionGetById = async (id: string) => {
  const specialistResponse = await Specialist.getById(id);

  if (!specialistResponse.success) {
    createLogger.error({
      model: "specialist/getById",
      error: specialistResponse.error,
    });
    return { success: false, data: null, error: specialistResponse.error };
  }

  const data = {
    ...specialistResponse.data,
    specialties: [],
    districts: [],
  };

  const responseDistricts = await SpecialistDistrict.getBySpecialistId(id);

  if (!responseDistricts.success) {
    createLogger.error({
      model: "specialistDistrict/getBySpecialistId",
      error: responseDistricts.error,
    });
    return { success: false, data: null, error: responseDistricts.error };
  }

  data.districts = responseDistricts.data;

  const responseSpecialties = await SpecialistSpecialty.getBySpecialistId(id);

  if (!responseSpecialties.success) {
    createLogger.error({
      model: "specialistSpecialty/getBySpecialistId",
      error: responseSpecialties.error,
    });
    return { success: false, data: null, error: responseSpecialties.error };
  }

  data.specialties = responseSpecialties.data;

  return { success: true, data, error: null };
};
