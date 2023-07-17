import createLogger from "../util/logger";

import * as Field from "../models/field";

const getByLeadId = async (req: any, res: any) => {
  const { lead_id } = req.params;
  const fieldResponse = await Field.getByLeadId(lead_id);

  if (!fieldResponse.success) {
    createLogger.error({
      model: "field/getByLeadId",
      error: fieldResponse.error,
    });
    res.status(500).json({ error: fieldResponse.error });
    return;
  }

  createLogger.info({
    controller: "field/getByLeadId",
    message: "OK",
  });
  res.status(200).json(fieldResponse.data);
};

export { getByLeadId };
