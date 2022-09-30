import createLogger from "../util/logger";

import { getAllModel } from "../models/status";

const getAllController = async (req: any, res: any) => {
  const statusResponse = await getAllModel();

  if (!statusResponse.success) {
    createLogger.error({
      model: "status/getAllModel",
      error: statusResponse.error,
    });
    res.status(500).json({ error: statusResponse.error });
    return;
  }

  createLogger.info({
    controller: "status/getAllController",
    message: "OK",
  });
  res.status(200).json(statusResponse.data);
};

export { getAllController };
