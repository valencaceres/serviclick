import createLogger from "../util/logger";

import * as Qualification from "../models/qualification";

const getAll = async (req: any, res: any) => {
  const qualificationResponse = await Qualification.getAll();

  if (!qualificationResponse.success) {
    createLogger.error({
      model: `qualification/getAll`,
      error: qualificationResponse.error,
    });
    return res.status(500).json({ error: "Error retrieving qualifications" });
  }

  createLogger.info({
    model: `qualification/getAll`,
    message: `Qualifications retrieved successfully`,
  });

  return res.status(200).json(qualificationResponse.data);
};

export { getAll };
