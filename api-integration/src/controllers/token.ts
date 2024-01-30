import createLogger from "../util/logger";
import * as Token from "../models/token";

const generate = async (req: any, res: any) => {
  const { retail_id, email, password } = req.body;
  const tokenResponse = await Token.createToken(retail_id, email, password);

  if (!tokenResponse.success) {
    createLogger.error({
      model: "token/generate",
      error: tokenResponse.error,
    });
    res
      .status(500)
      .json({ success: false, data: null, error: "Error generating token" });
    return;
  }

  createLogger.info({
    controller: "token/generate",
    message: "OK",
  });
  res
    .status(200)
    .json({ success: true, data: tokenResponse.data, error: null });
};

export { generate };
