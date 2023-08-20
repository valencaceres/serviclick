import createLogger from "../util/logger";
import * as Value from "../models/value";

const create = async (req: any, res: any) => {
  const { family_id, name, valuetype_code } = req.body;

  const valueResponse = await Value.create(family_id, name, valuetype_code);

  if (!valueResponse.success) {
    createLogger.error({
      model: "value/create",
      error: valueResponse.error,
    });
    res.status(500).json({ error: "Error creating value" });
    return;
  }

  createLogger.info({
    controller: "value/create",
    message: "OK",
  });
  res.status(200).json(valueResponse.data);
};

const updateById = async (req: any, res: any) => {
  const { id, family_id, name, valuetype_code } = req.body;

  const valueResponse = await Value.updateById(
    id,
    family_id,
    name,
    valuetype_code
  );

  if (!valueResponse.success) {
    createLogger.error({
      model: "value/updateById",
      error: valueResponse.error,
    });
    res.status(500).json({ error: "Error updating value" });
    return;
  }

  createLogger.info({
    controller: "value/updateById",
    message: "OK",
  });
  res.status(200).json(valueResponse.data);
};

const getAll = async (req: any, res: any) => {
  const valueResponse = await Value.getAll();

  if (!valueResponse.success) {
    createLogger.error({
      model: "value/getAll",
      error: valueResponse.error,
    });
    res.status(500).json({ error: "Error retrieving values" });
    return;
  }

  createLogger.info({
    controller: "value/getAll",
    message: "OK",
  });
  res.status(200).json(valueResponse.data);
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const valueResponse = await Value.getById(id);

  if (!valueResponse.success) {
    createLogger.error({
      model: "value/getById",
      error: valueResponse.error,
    });
    res.status(500).json({ error: "Error retrieving value" });
    return;
  }

  createLogger.info({
    controller: "value/getById",
    message: "OK",
  });
  res.status(200).json(valueResponse.data);
};

const getFamilies = async (req: any, res: any) => {
  const assistanceResponse = await Value.getFamilies();

  if (!assistanceResponse.success) {
    createLogger.error({
      model: "assistance/getFamilies",
      error: assistanceResponse.error,
    });
    res.status(500).json({ error: "Error retrieving families" });
    return;
  }

  createLogger.info({
    controller: "assistance/getFamilies",
    message: "OK",
  });
  res.status(200).json(assistanceResponse.data);
};

const getByFamilyId = async (req: any, res: any) => {
  const { family_id } = req.params;
  const assistanceResponse = await Value.getByFamilyId(family_id);

  if (!assistanceResponse.success) {
    createLogger.error({
      model: "value/getByFamilyId",
      error: assistanceResponse.error,
    });
    res.status(500).json({ error: "Error retrieving value" });
    return;
  }

  createLogger.info({
    controller: "value/getByFamilyId",
    message: "OK",
  });
  res.status(200).json(assistanceResponse.data);
};

export { create, updateById, getAll, getById, getFamilies, getByFamilyId };
