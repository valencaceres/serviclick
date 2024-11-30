import { NextFunction, Request, Response } from "express";
import { flowApiInstance } from "../utils/api";
import sendResponse from "../utils/sendResponse";
import boom from "@hapi/boom";
import config from "../utils/config";
import jsonToSignature from "../utils/jsonToSignature";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { planId, name, email, externalId } = req.body;

    const customerResponse = await upsertCustomer(name, email, externalId);

    if (!customerResponse?.success) {
      return next(boom.badImplementation("Error creating customer"));
    }

    const customerId = customerResponse?.data.customerId;

    const params: any = {
      apiKey: config.flowApiKey,
      planId,
      customerId,
    };

    params.s = jsonToSignature(params);

    const data = new URLSearchParams(params).toString();

    const suscriptionResponse = await flowApiInstance.post(
      "/subscription/create",
      data
    );
    console.log(suscriptionResponse.data.invoices);
    sendResponse(req, res, suscriptionResponse.data);
  } catch (e: any) {
    return next(boom.badImplementation(e.response?.data || e.message));
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await flowApiInstance.get("/subscription/get");
    sendResponse(req, res, response.data);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const subscriptionId = id;

    const params: any = {
      apiKey: config.flowApiKey,
      subscriptionId,
    };

    params.s = jsonToSignature(params);

    const data = new URLSearchParams(params).toString();

    const suscriptionResponse = await flowApiInstance.get(
      `/subscription/get?data=${data}`
    );
    sendResponse(req, res, suscriptionResponse.data);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const getCustomer = async () => {
  try {
    const params: any = {
      apiKey: config.flowApiKey,
    };

    params.s = jsonToSignature(params);
    const data = new URLSearchParams(params).toString();

    const response = await flowApiInstance.get(`/customer/list?${data}`);

    return { success: true, data: response.data, error: null };
  } catch (e: any) {
    return { success: false, data: null, error: e.response?.data || e.message };
  }
};

export { getAll, getById, create, getCustomer };

const upsertCustomer = async (
  name: string,
  email: string,
  externalId: string
) => {
  try {
    const params: any = {
      apiKey: config.flowApiKey,
      name: name,
      email: email,
      externalId: externalId,
    };
    params.s = jsonToSignature(params);
    const data = new URLSearchParams(params).toString();

    const customerResponse = await getCustomer();

    const existingCustomer = customerResponse.data.data.find(
      (customer: any) => customer.externalId === externalId
    );

    if (existingCustomer) {
      const updatingParams: any = {
        apiKey: config.flowApiKey,
        customerId: existingCustomer.customerId,
        name,
        email,
        externalId,
      };
      updatingParams.s = jsonToSignature(updatingParams);
      const updateData = new URLSearchParams(updatingParams).toString();
      const updateResponse = await flowApiInstance.post(
        "/customer/edit",
        updateData
      );
      return {
        success: true,
        data: updateResponse.data,
        error: null,
        action: "updated",
      };
    } else {
      const createResponse = await flowApiInstance.post(
        "/customer/create",
        data
      );
      return {
        success: true,
        data: createResponse.data,
        error: null,
        action: "created",
      };
    }
  } catch (e: any) {
    console.error("Error in upsertCustomer:", e);
    return { success: false, data: null, error: e.response?.data || e.message };
  }
};
