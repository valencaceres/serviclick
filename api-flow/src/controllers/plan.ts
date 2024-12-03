import { flowApiInstance } from "../utils/api";
import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";
import jsonToSignature from "../utils/jsonToSignature";
import sendResponse from "../utils/sendResponse";
import config from "../utils/config";

const upsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      planId,
      name,
      currency,
      amount,
      interval,
      urlCallback,
    }: {
      planId: string;
      name: string;
      currency: string;
      amount: number;
      interval: 1 | 2 | 3 | 4;
      urlCallback: string;
    } = req.body;

    const getResponse = await getByIdFunction(planId);

    const params: any = {
      apiKey: config.flowApiKey,
      planId,
      name,
      currency,
      amount,
      interval,
      urlCallback,
    };

    params.s = jsonToSignature(params);

    const data = new URLSearchParams(params).toString();

    let response;
    if (config.flowWebhookUrl) {
      if (getResponse.success) {
        const editParams: any = {
          apiKey: config.flowApiKey,
          planId: getResponse.data.planId,
          name,
          currency,
          amount,
          interval,
          urlCallback,
        };

        editParams.s = jsonToSignature(editParams);

        const editData = new URLSearchParams(editParams).toString();
        response = await flowApiInstance.post("/plans/edit", editData);
      } else {
        response = await flowApiInstance.post("/plans/create", data);
      }

      if (!response.data || Object.keys(response.data).length === 0) {
        return next(boom.badImplementation("Error creating or updating plan"));
      }

      sendResponse(req, res, response.data);
    } else {
      return next(
        boom.badImplementation("Error, UrlCallback for webhook doesn´t exist")
      );
    }
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params: any = {
      apiKey: config.flowApiKey,
    };

    params.s = jsonToSignature(params);

    const data = new URLSearchParams(params).toString();

    const response = await flowApiInstance.get(`/plans/list?${data}`);
    sendResponse(req, res, response.data);
    return response.data;
  } catch (e: any) {
    return next(boom.badImplementation((e as Error).message));
  }
};

const getByIdFunction = async (planId: string) => {
  try {
    const params: any = {
      apiKey: config.flowApiKey,
      planId,
    };

    params.s = jsonToSignature(params);

    const data = new URLSearchParams(params).toString();
    const response = await flowApiInstance.get(`/plans/get?${data}`);
    return { success: true, data: response.data, error: null };
  } catch (e: any) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const params: any = {
      apiKey: config.flowApiKey,
      planId: id,
    };

    params.s = jsonToSignature(params);

    const data = new URLSearchParams(params).toString();
    const response = await flowApiInstance.get(`/plans/get?${data}`);
    sendResponse(req, res, response.data);
  } catch (e: any) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { upsert, getAll, getById };
