import createLogger from "../util/logger";
import * as Relationship from "../models/relationship";

const getAll = async (req: any, res: any) => {
  const relationship = await Relationship.getAll();

  if (!relationship.success) {
    createLogger.error({
      model: "relationship/getAll",
      error: relationship.error,
    });
    res
      .status(500)
      .json({
        success: false,
        data: null,
        error: "Error retrieving relationships",
      });
    return;
  }

  createLogger.info({
    controller: "relationship/getAll",
    message: "OK",
  });
  res.status(200).json({ success: true, data: relationship.data, error: null });
};

export { getAll };
