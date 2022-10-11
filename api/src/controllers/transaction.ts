import createLogger from "../util/logger";

import {
  getActivesByRutAndProductIdModel,
  getByFiltersModel,
} from "../models/transaction";

const getActivesByRutAndProductIdController = async (req: any, res: any) => {
  const { customer_type, rut, product_id } = req.body;

  const transactionResponse = await getActivesByRutAndProductIdModel(
    customer_type,
    rut,
    product_id
  );

  if (!transactionResponse.success) {
    createLogger.error({
      model: "transaction/getActivesByRutAndProductIdModel",
      error: transactionResponse.error,
    });
    res.status(500).json({ error: transactionResponse.error });
    return;
  }

  createLogger.info({
    controller: "transaction/getActivesByRutAndProductIdController",
    message: "OK",
  });
  res.status(200).json(transactionResponse.data);
};

const getByFiltersController = async (req: any, res: any) => {
  const { channel_id, client_type, rut, period_id, status_id } = req.body;

  const transactionResponse = await getByFiltersModel(
    channel_id,
    client_type,
    rut,
    period_id,
    status_id
  );

  if (!transactionResponse.success) {
    createLogger.error({
      model: "transaction/getByFiltersModel",
      error: transactionResponse.error,
    });
    res.status(500).json({ error: transactionResponse.error });
    return;
  }

  createLogger.info({
    controller: "transaction/getAllController",
    message: "OK",
  });
  res.status(200).json(transactionResponse.data);
};

export { getActivesByRutAndProductIdController, getByFiltersController };
