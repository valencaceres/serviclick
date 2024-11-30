import { Request, Response, NextFunction, response } from "express";
import * as Webhook from '../models/webhook'

import createLogger from '../utils/logger'
import { ApiInstance } from "../utils/api";

const flowWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /* const { data, event } = req.body; */
    /* const { subscription_id } = data;
    
    const response = await Webhook.create(subscription_id, event);
    if (!response.success) {
      createLogger.error({
        model: "cron/create",
        error: response.error,
      });
      res.status(500).json({ error: response.error });
      return;
    }

    if (response.success) {
      const executeWebHook = await ApiInstance.post(
        "/api/webhook/reveniuWebHook",
        {
          id: response.data?.id,
          event: response.data?.event,
          createddate: response.data?.createddate,
          subscription_id: response.data?.subscription_id,
        }
      );

      if (executeWebHook.status !== 200) {
        createLogger.error({
          url: `${ApiInstance}/api/webhook/flowWebHook`,
          error: executeWebHook.statusText,
        });
        return res.status(500).json({ error: executeWebHook.statusText });
      }
    } */
    console.log(req.body);
    return res.status(200).json('Funciono');
  } catch (error) {
    createLogger.error({
      controller: "webhook-reveniu",
      error: (error as Error).message,
    });
    return res.status(500).json({ error });
  }
};

export {flowWebhook}