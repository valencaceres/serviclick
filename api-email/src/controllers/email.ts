import { sendModel } from "../models/email";

const sendController = async (req: any, res: any) => {
  try {
    const { to, subject, message } = req.body;
    const result = await sendModel(to, subject, message);
    res.status(200).json({ success: true, data: result, error: null });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, data: null, error: (e as Error).message });
  }
};

export { sendController };
