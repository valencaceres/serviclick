import createLogger from "../util/logger";

import { getByFiltersModel } from "../models/transaction";

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
      model: "status/getByFiltersModel",
      error: transactionResponse.error,
    });
    res.status(500).json({ error: transactionResponse.error });
    return;
  }

  createLogger.info({
    controller: "status/getAllController",
    message: "OK",
  });
  res.status(200).json(transactionResponse.data);
};

export { getByFiltersController };
