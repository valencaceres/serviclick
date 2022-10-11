import createLogger from "../utils/logger";
import { sendModel } from "../models/email";

const sendController = async (req: any, res: any) => {
  try {
    const { from, to, subject, message } = req.body;
    const result = await sendModel(from, to, subject, message);

    createLogger.error({
      model: "email/sendModel",
      message: { status: "send", from, to, subject },
    });

    res.status(200).json({ success: true, data: result, error: null });
  } catch (e) {
    createLogger.error({
      model: "insured/getByRutModel",
      error: (e as Error).message,
    });
    res
      .status(500)
      .json({ success: false, data: null, error: (e as Error).message });
  }
};

export { sendController };
