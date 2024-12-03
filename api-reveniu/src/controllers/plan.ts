import { reveniuApiInstance } from "../utils/api";
import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";
import sendResponse from "../utils/sendResponse";
import config from "../utils/config";

type FrequencyType = "U" | "S" | "M" | "A";

interface RequestBody {
  id: number;
  frequency: FrequencyType;
  discount: { type: string; percent: number };
  cicles: number;
  trial_cicles: number;
  title: string;
  description: string;
  is_custom_link: boolean;
  price: number;
  is_uf: boolean;
  auto_renew: boolean;
  prefferred_due_day: number;
  discount_enabled: boolean;
}

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await reveniuApiInstance.get("/plans");
    sendResponse(req, res, response.data);
    return response.data;
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const response = await reveniuApiInstance.get(`/plans/${id}`);
    sendResponse(req, res, response.data);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const upsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      id,
      frequency,
      cicles,
      trial_cicles,
      title,
      description,
      is_custom_link,
      is_uf,
      price,
      auto_renew,
      prefferred_due_day,
      discount,
      discount_enabled,
    } = req.body as RequestBody;

    const requestData = {
      frequency,
      cicles,
      trial_cicles,
      title,
      description,
      is_custom_link,
      is_uf,
      price,
      auto_renew,
      prefferred_due_day,
      discount,
      discount_enabled,
      success_message:
        "Muchas gracias por preferirnos, ya eres parte de ServiClick!",
      redirect_to: config.success,
      redirect_to_failure: config.error,
    };

    if (id) {
      try {
        const ifPlanExist = await reveniuApiInstance.get(`/plans/${id}`);
        const planUpdateResponse = await reveniuApiInstance.patch(
          `/plans/${id}/`,
          requestData
        );
        sendResponse(req, res, planUpdateResponse.data);
      } catch (error: any) {
        if (error.response?.status === 404) {
          const planCreateResponse = await reveniuApiInstance.post(
            "/plans/",
            requestData
          );
          sendResponse(req, res, planCreateResponse.data);
        } else {
          throw error;
        }
      }
    } else {
      const planCreateResponse = await reveniuApiInstance.post(
        "/plans/",
        requestData
      );
      sendResponse(req, res, planCreateResponse.data);
    }
  } catch (error: any) {
    console.error(
      "Error calling Reveniu API:",
      error.response?.data || error.message
    );
    return next(boom.badImplementation(error.message));
  }
};

export { getAll, getById, upsert };
