import createLogger from "../util/logger";

import * as Family from "../models/family";
import * as FamilyValue from "../models/familyValue";

const createFamily = async (req: any, res: any) => {
  const { name, values } = req.body;
  const familyResponse = await Family.createFamily(name);

  if (!familyResponse.success) {
    createLogger.error({
      model: "family/createFamily",
      error: familyResponse.error,
    });
    res.status(500).json({ error: familyResponse.error });
    return;
  }

  const { id } = familyResponse.data;
  const createdValues = await createValues(id, values);

  createLogger.info({
    controller: "family",
    message: "OK",
  });
  res.status(200).json({ ...familyResponse.data, values: [...createdValues] });
};

const updateFamily = async (req: any, res: any) => {
  const { id } = req.params;
  const { name, values } = req.body;

  const familyResponse = await Family.updateFamily(id, name);
  if (!familyResponse.success) {
    createLogger.error({
      model: "family/updateFamily",
      error: familyResponse.error,
    });
    res.status(500).json({ error: familyResponse.error });
    return;
  }

  const responseDeletedValues = await FamilyValue.deleteFamilyValues(id);
  if (!responseDeletedValues.success) {
    createLogger.error({
      model: "family/deleteFamilyValues",
      error: responseDeletedValues.error,
    });
    res.status(500).json({ error: responseDeletedValues.error });
    return;
  }

  const createdValues = await createValues(id, values);

  createLogger.info({
    controller: "family",
    message: "OK",
  });
  res.status(200).json({ ...familyResponse.data, values: [...createdValues] });
};

const deleteFamily = async (req: any, res: any) => {
  const { id } = req.params;
  const familyResponse = await Family.deleteFamily(id);

  if (!familyResponse.success) {
    createLogger.error({
      model: "family/deleteFamily",
      error: familyResponse.error,
    });
    res.status(500).json({ error: familyResponse.error });
    return;
  }

  createLogger.info({
    controller: "family",
    message: "OK",
  });
  res.status(200).json(familyResponse.data);
};

const listFamilies = async (req: any, res: any) => {
  const familyResponse = await Family.listFamilies();

  if (!familyResponse.success) {
    createLogger.error({
      model: "family/listFamilies",
      error: familyResponse.error,
    });
    res.status(500).json({ error: familyResponse.error });
    return;
  }

  createLogger.info({
    controller: "family",
    message: "OK",
  });
  res.status(200).json(familyResponse.data);
};

const getFamily = async (req: any, res: any) => {
  const { id } = req.params;
  const familyResponse = await Family.getFamily(id);

  if (!familyResponse.success) {
    createLogger.error({
      model: "family/getFamily",
      error: familyResponse.error,
    });
    res.status(500).json({ error: familyResponse.error });
    return;
  }

  const familyValuesResponse = await FamilyValue.listFamilyValues(id);
  if (!familyValuesResponse.success) {
    createLogger.error({
      model: "family/listFamilyValues",
      error: familyResponse.error,
    });
    res.status(500).json({ error: familyValuesResponse.error });
    return;
  }

  createLogger.info({
    controller: "family",
    message: "OK",
  });
  res.status(200).json({
    ...familyResponse.data,
    values: [...familyValuesResponse.data],
  });
};

const createValues = async (id: string, values: any) => {
  const errors: any = [];

  const createdValues = await Promise.all(
    values.map(async (value: any) => {
      const familyValueRespose = await FamilyValue.createFamilyValue(id, value);
      if (!familyValueRespose.success) {
        createLogger.error({
          model: "familyValue/createFamilyValue",
          error: familyValueRespose.error,
        });
        errors.push(familyValueRespose.error);
      }

      return familyValueRespose.data;
    })
  );

  return createdValues;
};

export { createFamily, updateFamily, deleteFamily, getFamily, listFamilies };
