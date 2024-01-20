import createLogger from "../util/logger";
import * as Lead from "../models/lead";

import { UpsertRequest } from "../interfaces/leadRequest";


const Upsert = async (req: any, res: any) => {
    const requestData: UpsertRequest = req.body;

  const leadResponse = await Lead.upsert(requestData);
  if (!leadResponse.success) {
    createLogger.error({
      model: "lead/Upsert",
      error: leadResponse.error,
    });
    res.status(500).json({ error: "Error creating lead " });
    return;
  }

  createLogger.info({
    controller: "lead/Upsert",
    message: "OK",
  });
  res.status(200).json(leadResponse.data);
};

export { Upsert };
