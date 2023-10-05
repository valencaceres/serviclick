import createLogger from "../util/logger";

import * as Field from "../models/field";

const getByProductPlanId = async (req: any, res: any) => {
  const { productPlan_id } = req.params;
  const fieldResponse = await Field.getByProductPlanId(productPlan_id);

  if (!fieldResponse.success) {
    createLogger.error({
      model: "field/getByProductPlanId",
      error: fieldResponse.error,
    });
    res.status(500).json({ error: "Error retrieving field" });
    return;
  }

  createLogger.info({
    controller: "field/getByProductPlanId",
    message: "OK",
  });
  res.status(200).json(fieldResponse.data);
};

export { getByProductPlanId };
