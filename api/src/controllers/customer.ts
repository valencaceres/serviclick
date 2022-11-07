import createLogger from "../util/logger";

import { getByRutModel } from "../models/customer";

const getByRutController = async (req: any, res: any) => {
  const { rut } = req.params;
  const response = await getByRutModel(rut);

  if (!response.success) {
    createLogger.error({
      model: "customer/getByRutModel",
      error: response.error,
    });
    res.status(500).json({ error: response.error });
    return;
  }

  createLogger.info({
    controller: "customer",
    message: "OK",
  });
  res.status(200).json(response.data);
};

export { getByRutController };
