import createLogger from "../util/logger";

import * as Family from "../models/family";
import * as FamilyValue from "../models/familyValue";

const createFamily = async (req: any, res: any) => {
  const { name } = req.body;

  const familyResponse = await Family.createFamily(name);

  if (!familyResponse.success) {
    createLogger.error({
      model: "family/createFamily",
      error: familyResponse.error,
    });
    res.status(500).json({ error: "Error creating family" });
    return;
  }

  createLogger.info({
    controller: "family",
    message: "OK",
  });
  res.status(200).json(familyResponse.data);
};

const updateFamily = async (req: any, res: any) => {
  const { id } = req.params;
  const { name } = req.body;

  const familyResponse = await Family.updateFamily(id, name);
  if (!familyResponse.success) {
    createLogger.error({
      model: "family/updateFamily",
      error: familyResponse.error,
    });
    res.status(500).json({ error: "Error updating family" });
    return;
  }

  createLogger.info({
    controller: "family",
    message: "OK",
  });
  res.status(200).json(familyResponse.data);
};

const deleteFamily = async (req: any, res: any) => {
  const { id } = req.params;
  const familyResponse = await Family.deleteFamily(id);

  if (!familyResponse.success) {
    createLogger.error({
      model: "family/deleteFamily",
      error: familyResponse.error,
    });
    res.status(500).json({ error: "Error deleting family" });
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
    res.status(500).json({ error: "Error listing families" });
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
    res.status(500).json({ error: "Error retrieving family" });
    return;
  }

  createLogger.info({
    controller: "family",
    message: "OK",
  });
  res.status(200).json(familyResponse.data);
};

export { createFamily, updateFamily, deleteFamily, getFamily, listFamilies };
