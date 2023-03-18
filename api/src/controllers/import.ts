import createLogger from "../util/logger";

import * as Import from "../models/import";

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

export { getAll, getById_BCI };
