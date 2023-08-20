import createLogger from "../util/logger";

import * as FileFormat from "../models/fileFormat";

const create = async (req: any, res: any) => {
  const { lead_id, fields } = req.body;

  const deleteResponse = await FileFormat.deleteByLeadId(lead_id);

  if (!deleteResponse.success) {
    createLogger.error({
      model: "fileFormat/deleteByLeadId",
      error: deleteResponse.error,
    });
    res.status(500).json({ error: "Error deleting file format" });
    return;
  }

  let index = 0;
  for (const field of fields) {
    const contents = await FileFormat.create(
      lead_id,
      field.field_id,
      index + 1
    );
    index++;
  }

  res.status(200).json("ok");
};

const getAll = async (req: any, res: any) => {
  const fileFormatResponse = await FileFormat.getAll();

  if (!fileFormatResponse.success) {
    createLogger.error({
      model: "fileFormat/getAll",
      error: fileFormatResponse.error,
    });
    res.status(500).json({ error: "Error retrieving files format" });
    return;
  }

  createLogger.info({
    controller: "fileFormat/getAll",
    message: "OK",
  });
  res.status(200).json(fileFormatResponse.data);
};

const getByLeadId = async (req: any, res: any) => {
  const { lead_id } = req.params;
  const fileFormatResponse = await FileFormat.getByLeadId(lead_id);

  if (!fileFormatResponse.success) {
    createLogger.error({
      model: "fileFormat/getByLeadId",
      error: fileFormatResponse.error,
    });
    res.status(500).json({ error: "Error retrieving file format" });
    return;
  }

  createLogger.info({
    controller: "fileFormat/getByLeadId",
    message: "OK",
  });
  res.status(200).json(fileFormatResponse.data);
};

const deleteByLeadId = async (req: any, res: any) => {
  const { lead_id } = req.params;
  const fileFormatResponse = await FileFormat.deleteByLeadId(lead_id);

  if (!fileFormatResponse.success) {
    createLogger.error({
      model: "fileFormat/deleteByLeadId",
      error: fileFormatResponse.error,
    });
    res.status(500).json({ error: "Error deleting file format" });
    return;
  }

  createLogger.info({
    controller: "fileFormat/deleteByLeadId",
    message: "OK",
  });
  res.status(200).json(fileFormatResponse.data);
};

export { create, getAll, getByLeadId, deleteByLeadId };
