import createLogger from "../util/logger";

import * as FileFormat from "../models/fileFormat";

const create = async (req: any, res: any) => {
  const { company_id, field_id, number } = req.body;

  const fileFormatResponse = await FileFormat.create(
    company_id,
    field_id,
    number
  );

  if (!fileFormatResponse.success) {
    createLogger.error({
      model: "fileFormat/create",
      error: fileFormatResponse.error,
    });
    res.status(500).json({ error: fileFormatResponse.error });
    return;
  }

  createLogger.info({
    controller: "fileFormat/create",
    message: "OK",
  });
  res.status(200).json(fileFormatResponse.data);
};

const getAll = async (req: any, res: any) => {
  const fileFormatResponse = await FileFormat.getAll();

  if (!fileFormatResponse.success) {
    createLogger.error({
      model: "fileFormat/getAll",
      error: fileFormatResponse.error,
    });
    res.status(500).json({ error: fileFormatResponse.error });
    return;
  }

  createLogger.info({
    controller: "fileFormat/getAll",
    message: "OK",
  });
  res.status(200).json(fileFormatResponse.data);
};

const getByCompanyId = async (req: any, res: any) => {
  const { company_id } = req.params;
  const fileFormatResponse = await FileFormat.getByCompanyId(company_id);

  if (!fileFormatResponse.success) {
    createLogger.error({
      model: "fileFormat/getByCompanyId",
      error: fileFormatResponse.error,
    });
    res.status(500).json({ error: fileFormatResponse.error });
    return;
  }

  createLogger.info({
    controller: "fileFormat/getByCompanyId",
    message: "OK",
  });
  res.status(200).json(fileFormatResponse.data);
};

const deleteByCompanyId = async (req: any, res: any) => {
  const { company_id } = req.params;
  const fileFormatResponse = await FileFormat.deleteByCompanyId(company_id);

  if (!fileFormatResponse.success) {
    createLogger.error({
      model: "fileFormat/deleteByCompanyId",
      error: fileFormatResponse.error,
    });
    res.status(500).json({ error: fileFormatResponse.error });
    return;
  }

  createLogger.info({
    controller: "fileFormat/deleteByCompanyId",
    message: "OK",
  });
  res.status(200).json(fileFormatResponse.data);
};

export { create, getAll, getByCompanyId, deleteByCompanyId };
