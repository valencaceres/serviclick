import createLogger from "../util/logger";

import * as Reimbursment from "../models/reimbursment";

const getAll = async (req: any, res: any) => {
  const { isImed, applicant_rut, applicant_name, page, records } = req.query;

  const reimbursmentsResponse = await Reimbursment.getAll(
    isImed,
    applicant_rut,
    applicant_name,
    page,
    records
  );

  if (!reimbursmentsResponse.success) {
    createLogger.error({
      model: `reimbursment/getAll`,
      error: reimbursmentsResponse.error,
    });
    return res.status(500).json({ error: "Error retrieving reimbursments" });
  }

  createLogger.info({
    model: `reimbursment/getAll`,
    message: `reimbursments retrieved successfully`,
  });

  return res.status(200).json(reimbursmentsResponse);
};

const update = async (req: any, res: any) => {
  const { status, user_id, imed_amount, amount, comment } = req.body;
  const { id } = req.params;
  const reimbursmentsResponse = await Reimbursment.update(
    id,
    status,
    user_id,
    imed_amount,
    amount,
    comment
  );
  if (!reimbursmentsResponse.success) {
    createLogger.error({
      model: `reimbursment/update`,
      error: reimbursmentsResponse.error,
    });
    return res.status(500).json({ error: "Error updating reimbursments" });
  }

  createLogger.info({
    model: `reimbursment/update`,
    message: `reimbursments updating successfully`,
  });

  return res.status(200).json(reimbursmentsResponse);
};

export { getAll, update };
