import createLogger from "../util/logger";
import * as ValueType from "../models/valueType";

const create = async (req: any, res: any) => {
  const { code, name, description } = req.body;

  const valueTypeResponse = await ValueType.create(code, name, description);

  if (!valueTypeResponse.success) {
    createLogger.error({
      model: "valueType/create",
      error: valueTypeResponse.error,
    });
    res.status(500).json({ error: "Error creating value type" });
    return;
  }

  createLogger.info({
    controller: "valueType/create",
    message: "OK",
  });
  res.status(200).json(valueTypeResponse.data);
};

const updateById = async (req: any, res: any) => {
  const { id, code, name, description } = req.body;

  const valueTypeResponse = await ValueType.updateById(
    id,
    code,
    name,
    description
  );

  if (!valueTypeResponse.success) {
    createLogger.error({
      model: "valueType/updateById",
      error: valueTypeResponse.error,
    });
    res.status(500).json({ error: "Error updating value type" });
    return;
  }

  createLogger.info({
    controller: "valueType/updateById",
    message: "OK",
  });
  res.status(200).json(valueTypeResponse.data);
};

const getAll = async (req: any, res: any) => {
  const valueTypeResponse = await ValueType.getAll();

  if (!valueTypeResponse.success) {
    createLogger.error({
      model: "valueType/getAll",
      error: valueTypeResponse.error,
    });
    res.status(500).json({ error: "Error retrieving value types" });
    return;
  }

  createLogger.info({
    controller: "valueType/getAll",
    message: "OK",
  });
  res.status(200).json(valueTypeResponse.data);
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const valueTypeResponse = await ValueType.getById(id);

  if (!valueTypeResponse.success) {
    createLogger.error({
      model: "valueType/getById",
      error: valueTypeResponse.error,
    });
    res.status(500).json({ error: "Error retrieving value type" });
    return;
  }

  createLogger.info({
    controller: "valueType/getById",
    message: "OK",
  });
  res.status(200).json(valueTypeResponse.data);
};

export { create, updateById, getAll, getById };
