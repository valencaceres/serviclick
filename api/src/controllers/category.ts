import createLogger from "../util/logger";

import * as Category from "../models/category";

const getAll = async (req: any, res: any) => {
  const response = await Category.getAll();

  if (!response.success) {
    createLogger.error({
      model: "category/getAll",
      error: response.error,
    });
    res.status(500).json({ error: response.error });
    return;
  }

  createLogger.info({
    controller: "category",
    message: "OK",
  });
  return res.status(200).json(response.data);
};

export { getAll };
