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

    const subscriptionResponse = await flowApiInstance.post(
      "/subscription/create",
      data
    );

    if (!subscriptionResponse) {
      return next(boom.badImplementation("Error creating subscription"));
    }

    const invoiceResponse = await getInvoicesById(
      subscriptionResponse.data.invoices[0].id
    );

    const response = {
      subscriptionId: subscriptionResponse.data.subscriptionId,
      planId: subscriptionResponse.data.planId,
      paymentLink: invoiceResponse.data.paymentLink,
    };
    sendResponse(req, res, response);
  } catch (e: any) {
    return next(boom.badImplementation(e.response?.data || e.message));
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
      `/subscription/get?${data}`
    );
    sendResponse(req, res, suscriptionResponse.data);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const getAllByPlanId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { plan_id } = req.params;
    const params: any = {
      apiKey: config.flowApiKey,
      planId: plan_id,
    };

    params.s = jsonToSignature(params);

    const data = new URLSearchParams(params).toString();
    const response = await flowApiInstance.get(`/subscription/list?${data}`);
    sendResponse(req, res, response.data);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const getCustomer = async (externalId: string) => {
  try {
    let allCustomers: any[] = [];
    let hasMore = true;
    let currentPage = 0;

    while (hasMore) {
      const params: any = {
        apiKey: config.flowApiKey,
        limit: 100,
        start: currentPage,
      };
      params.page = currentPage;
      params.s = jsonToSignature(params);

      const data = new URLSearchParams(params).toString();
      const response = await flowApiInstance.get(`/customer/list?${data}`);
      const { data: customers, hasMore: more, total } = response.data;

      allCustomers = [...allCustomers, ...customers];

      hasMore = more;
      currentPage += 1;
    }

    const filteredCustomer = allCustomers.find(
      (customer) => customer.externalId === externalId
    );
    if (filteredCustomer) {
      return { success: true, data: filteredCustomer, error: null };
    } else {
      return { success: false, data: null, error: "Customer not found" };
    }
  } catch (e: any) {
    return { success: false, data: null, error: e.response?.data || e.message };
  }
};

const getCustomerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const params: any = {
      apiKey: config.flowApiKey,
      customerId: id,
    };

    params.s = jsonToSignature(params);
    const data = new URLSearchParams(params).toString();

    const response = await flowApiInstance.get(`/customer/get?${data}`);

    sendResponse(req, res, response.data);
  } catch (e: any) {
    return { success: false, data: null, error: e.response?.data || e.message };
  }
};

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

    const customerResponse = await getCustomer(externalId);

    const existingCustomer = customerResponse.data;

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
    return { success: false, data: null, error: e.response?.data || e.message };
  }
};

const getInvoicesById = async (invoiceId: string) => {
  try {
    const params: any = {
      apiKey: config.flowApiKey,
      invoiceId: invoiceId,
    };

    params.s = jsonToSignature(params);
    const data = new URLSearchParams(params).toString();

    const response = await flowApiInstance.get(`/invoice/get?${data}`);

    return { success: true, data: response.data, error: null };
  } catch (e: any) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getPaymentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query;
    const params: any = {
      apiKey: config.flowApiKey,
      token: token,
    };

    params.s = jsonToSignature(params);
    const data = new URLSearchParams(params).toString();

    const response = await flowApiInstance.get(`/payment/getStatus?${data}`);
    sendResponse(req, res, response.data);
  } catch (e: any) {
    return { success: false, data: null, error: e.response?.data || e.message };
  }
};

export {
  getAllByPlanId,
  getById,
  create,
  getCustomer,
  getCustomerById,
  getInvoicesById,
  getPaymentStatus,
};
