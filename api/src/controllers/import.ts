import createLogger from "../util/logger";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import * as Import from "../models/import";
import { resourceLimits } from "worker_threads";

interface IFileData_BCI {
  convenio: string;
  rut: string;
  dv: string;
  asegurado: string;
  sucursal: string;
  tipo_dcto: string;
  n_documento: string;
  direccion: string;
  comuna: string;
  telefono: string;
  fvigia_vig: string;
  fvigim_vig: string;
  fvigid_vig: string;
  fvigfa_vig: string;
  fvigfm_vig: string;
  fvigfd_vig: string;
  ramo: string;
  cobertura: string;
}

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

  fs.createReadStream(filePathName)
    .pipe(
      csv({
        headers: fileHeader_BCI,
        separator: ";",
      })
    )
    .on(
      "data",
      async (row) => await Import.uploadFile_BCI(company_id, year, month, row)
    )
    .on("end", () => {
      const response = {
        success: true,
        data: "OK",
        error: null,
      };

      if (!response.success) {
        createLogger.error({
          model: "import/uploadFile_BCI",
          error: response.error,
        });
        res.status(500).json({ error: response.error });
      }

      createLogger.info({
        model: "import/uploadFile_BCI",
        message: "File uploaded successfully",
      });
      return res.status(200).json(response.data);
    });
};

const getAll = async (req: any, res: any) => {
  const response = await Import.getAll();

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

  const response = await Import.getById_BCI(id);

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
