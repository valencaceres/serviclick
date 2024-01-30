import createLogger from "../util/logger";
import * as Payment from "../models/payment";

const Upsert = async (req: any, res: any) => {
  const { lead_id, status } = req.body;
  console.log(req.body);
  const paymentResponse = await Payment.upsert(lead_id, status);
  if (!paymentResponse.success) {
    createLogger.error({
      model: "payment/Upsert",
      error: paymentResponse.error,
    });
    res
      .status(500)
      .json({ success: true, data: null, error: "Error creating payment" });
    return;
  }

  createLogger.info({
    controller: "payment/Upsert",
    message: "OK",
  });
  res
    .status(200)
    .json({ success: true, data: paymentResponse.data, error: null });
};

export { Upsert };
