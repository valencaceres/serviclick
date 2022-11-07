import createLogger from "../util/logger";
import * as District from "../models/district";

const listAll = async (req: any, res: any) => {
  const districtResponse = await District.listAll();

  if (!districtResponse.success) {
    createLogger.error({
      model: "district/listAll",
      error: districtResponse.error,
    });
    res.status(500).json({ error: districtResponse.error });
    return;
  }

  createLogger.info({
    controller: "district/listAll",
    message: "OK",
  });
  res.status(200).json(districtResponse.data);
};

export { listAll };
