import createLogger from "../util/logger";
import fs from "fs";
import path from "path";

import * as ImportBCI from "../models/importBCI";
import * as ImportSummary from "../models/importSummary";

import { IFileData_BCI } from "../interfaces/import";

const fileHeader_BCI = [
  "CONVENIO",
  "RUT",
  "DV",
  "ASEGURADO",
  "SUCURSAL",
  "TIPO_DCTO",
  "N_DOCUMENTO",
  "DIRECCION",
  "COMUNA",
  "TELEFONO",
  "FVIGIA_VIG",
  "FVIGIM_VIG",
  "FVIGID_VIG",
  "FVIGFA_VIG",
  "FVIGFM_VIG",
  "FVIGFD_VIG",
  "RAMO",
  "COBERTURA",
];

const uploadFile_BCI = async (req: any, res: any, next: any) => {
  const { company_id, year, month } = req.body;
  const file = req.file;

  const filePathName = path.join(
    __dirname,
    "../",
    "../",
    "../",
    "input/",
    file.originalname
  );

  fs.writeFileSync(filePathName, file.buffer, {
    encoding: "utf-8",
  });

  const toString = file.buffer.toString();
  const rows = toString.split("\n");

  const responseImportSummary = await ImportSummary.create(
    company_id,
    year,
    month,
    rows.length - 1
  );

  if (!responseImportSummary.success) {
    createLogger.error({
      model: "import/importSummary",
      error: responseImportSummary.error,
    });
    return res.status(500).json({ error: responseImportSummary.error });
  }

  const importSummary_id = responseImportSummary.data.id;

  await Promise.all(
    rows.slice(1).map(async (row: string) => {
      const rowArray = row.split(";");

      const responseImportBCI = await ImportBCI.create(
        importSummary_id,
        rowArray
      );

      if (!responseImportBCI.success) {
        createLogger.error({
          model: "import/importBCI",
          error: responseImportBCI.error,
        });
        return res.status(500).json({ error: responseImportBCI.error });
      }
    })
  );

  createLogger.info({
    model: "import/importBCI",
    message: "File uploaded successfully",
  });

  res.status(200).json({ message: "File uploaded successfully" });
};

const getAll = async (req: any, res: any) => {
  const response = await ImportSummary.getAll();

  if (!response.success) {
    createLogger.error({
      model: "import/getAll",
      error: response.error,
    });
    res.status(500).json({ error: response.error });
    return;
  }

  createLogger.info({
    controller: "import",
    message: "OK",
  });
  res.status(200).json(response.data);
};

const getById_BCI = async (req: any, res: any) => {
  const { id } = req.params;

  const response = await ImportBCI.getById(id);

  if (!response.success) {
    createLogger.error({
      model: "import/getById_BCI",
      error: response.error,
    });
    res.status(500).json({ error: response.error });
    return;
  }

  createLogger.info({
    controller: "import",
    message: "OK",
  });
  res.status(200).json(response.data);
};

export { uploadFile_BCI, getAll, getById_BCI };
