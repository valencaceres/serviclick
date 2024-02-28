import createLogger from "../util/logger";
import * as cronModel from "../models/cron";
import axios from "axios";
import { apiServiClick } from "../util/api";
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
if (cronResponse.success){
  const executeWebHook = await apiServiClick.post(
    "/api/webhook/reveniuWebHook",
    { id: cronResponse.data?.id, event: cronResponse.data?.event, createddate: cronResponse.data?.createddate, subscription_id: cronResponse.data?.subscription_id}
  );

  if (executeWebHook.status !== 200) {
    createLogger.error({
      url: `${apiServiClick}/api/webhook/reveniuWebHook`,
      error: executeWebHook.statusText,
    });
    res.status(500).json({ error: executeWebHook.statusText });
    return;
  } 
}
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
