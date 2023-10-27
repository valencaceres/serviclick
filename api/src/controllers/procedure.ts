import createLogger from "../util/logger";

import * as Procedure from "../models/procedure";

const getAll = async (req: any, res: any) => {
  const procedureResponse = await Procedure.getAll();

  if (!procedureResponse.success) {
    createLogger.error({
      model: `procedure/getAll`,
      error: procedureResponse.error,
    });
    return res.status(500).json({ error: "Error retrieving procedures" });
  }

  createLogger.info({
    model: `procedure/getAll`,
    message: `Procedures retrieved successfully`,
  });

  return res.status(200).json(procedureResponse.data);
};

export { getAll };
