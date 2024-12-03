import { flowApiInstance, reveniuApiInstance } from "../utils/api";
import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/sendResponse";
import boom from "@hapi/boom";
import config from "../utils/config";

type FlowT = {
  planId: string;
  name: string;
  email: string;
  externalId: string;
};

type ReveniuT = {
  field_values: {
    address: string;
    email: string;
    amount: string
    name: string;
    phone: string;
    rut: string;
  };
  plan_id: number;
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { method } = req.query;
    const { name, email, amount, address, rut, phone, planId, lead_id } =
      req.body;

    const flowData: FlowT = {
      planId,
      name,
      email,
      externalId: lead_id,
    };


    const reveniuData: ReveniuT = {
      field_values: {
        email,
        name,
        amount,
        address,
        rut,
        phone,
      },
      plan_id: planId,
    };

    if (method === "flow") {
      const response = await flowApiInstance.post(
        "/subscription/create",
        flowData,
        { headers: { id: config.apiFlowKey } }
      );
      sendResponse(req, res, response.data);
    } 
    if (method === "reveniu") {
      const response = await reveniuApiInstance.post(
        "/subscription/create",
        reveniuData,
        { headers: { id: config.apiReveniuKey } }
      );
      sendResponse(req, res, response.data.data);
    } 
    return next(boom.notFound("Not found method"))
  } catch (e: any) {
    console.log(e.response?.data || e.message);
    return next(boom.badImplementation(e.response?.data || e.message));
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { method, plan_id } = req.query;
    if (method === "reveniu") {
      const reveniuResponse = await reveniuApiInstance.get(
        `/subscription/getAll`
      );
      sendResponse(req, res, reveniuResponse.data.data.data);
    }
    if (method === "flow") {
      const flowResponse = await flowApiInstance.get(
        `/subscription/getAllByPlanId/${plan_id}`
      );
      sendResponse(req, res, flowResponse.data);
    }
  } catch (e: any) {
    console.log(e.response?.data || e.message);
    return next(boom.badImplementation(e.response?.data || e.message));
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { method, subscription_id } = req.query;
    if (method === "reveniu") {
      const reveniuResponse = await reveniuApiInstance.get(
        `/subscription/getById/${subscription_id}`
      );
      sendResponse(req, res, reveniuResponse.data);
    }
    if (method === "flow") {
      const flowResponse = await flowApiInstance.get(
        `/subscription/getById/${subscription_id}`
      );
      sendResponse(req, res, flowResponse.data.data);
    }
  } catch (e: any) {
    console.log(e.response?.data || e.message);
    return next(boom.badImplementation(e.response?.data || e.message));
  }
};

export { create, getById, getAll };
