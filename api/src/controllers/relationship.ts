import createLogger from "../util/logger";
import * as Relationship from "../models/relationship";

const getAll = async (req: any, res: any) => {
  const relationshipResponse = await Relationship.getAll();

  if (!relationshipResponse.success) {
    createLogger.error({
      model: "relationship/getAll",
      error: relationshipResponse.error,
    });
    res.status(500).json({ error: relationshipResponse.error });
    return;
  }

  createLogger.info({
    controller: "relationship",
    message: "OK",
  });
  res.status(200).json(relationshipResponse.data);
};

export { getAll };
