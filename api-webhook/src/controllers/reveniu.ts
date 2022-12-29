import createLogger from "../util/logger";
import * as cronModel from "../models/cron";

const reveniuController = async (req: any, res: any) => {
  try {
    const { data } = req.body;
    const { event } = data;
    const { subscription_id } = data.data;

    const cronResponse = await cronModel.create(subscription_id, event);

    if (!cronResponse.success) {
      createLogger.error({
        model: "cron/create",
        error: cronResponse.error,
      });
      res.status(500).json({ error: cronResponse.error });
      return;
    }

    createLogger.info({
      controller: "reveniu",
      subscription_id,
      event,
      message: "OK",
    });

    res.status(200).json(cronResponse.data);
  } catch (error) {
    createLogger.error({
      controller: "reveniu",
      error: (error as Error).message,
    });
    res.status(500).json({ error });
    return;
  }
};

export { reveniuController };
