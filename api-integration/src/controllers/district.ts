import createLogger from "../util/logger";
import * as District from "../models/district";

const getAll = async (req: any, res: any) => {
  const districtResponse = await District.getAll();
  if (!districtResponse.success) {
    createLogger.error({
      model: "district/getAll",
      error: districtResponse.error,
    });
    res
      .status(500)
      .json({ success: false, data: null, error: "Error listing districts" });
    return;
  }

  createLogger.info({
    controller: "district/getAll",
    message: "OK",
  });
  res
    .status(200)
    .json({ success: true, data: districtResponse.data, error: null });
};

export { getAll };
