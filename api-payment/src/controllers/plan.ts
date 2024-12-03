import { flowApiInstance, reveniuApiInstance } from "../utils/api";
import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/sendResponse";
import boom from "@hapi/boom";
import config from "../utils/config";

type FrequencyCodeT = {
  U: number;
  S: number;
  M: number;
  A: number;
};

interface RequestBody {
  buyerType: string;
  id: string;
  agent_id: string;
  discount: DiscountT;
  currency: "P" | "U"
  frequency: "U" | "S" | "M" | "A";
  name: string;
  dueday: number;
  alias: string;
  price: number;
  productplan_id: string;
}

type DiscountT = {
  type: string;
  percent: number;
  cicles: number;
};

const upsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      discount,
      currency,
      frequency,
      name,
      alias,
      price,
      productplan_id,
    }: RequestBody = req.body;
    console.log(currency)
    const trialCicles =
      discount && discount.type === "t" && discount.cicles > 0
        ? discount.cicles
        : 0;
    const discountEnabled =
      discount && discount.type === "p" && discount.percent > 0;

    const responses: Array<{ method: string; planId: string; price: number }> =
      [];
    const FrequencyCode: FrequencyCodeT = {
      U: 1,
      S: 2,
      M: 3,
      A: 4,
    };

    const dueday: number = new Date().getDate();
    const adjustedDueDay: number = dueday > 27 ? 1 : dueday;

    const reveniuData = {
      frequency: FrequencyCode[frequency],
      cicles: 1,
      trial_cicles: trialCicles,
      title: name,
      description: name + " " + "(" + alias + ")",
      is_custom_link: true,
      price: price,
      is_uf: currency !== "P",
      auto_renew: true,
      prefferred_due_day: adjustedDueDay > 0 ? adjustedDueDay : null,
      discount_enabled: discountEnabled,
      success_message:
        "Muchas gracias por preferirnos, ya eres parte de ServiClick!",
    };

    const flowData = {
      planId: productplan_id,
      name: name,
      currency: currency === "P" ? "CLP" : "UF",
      amount: price,
      interval: FrequencyCode[frequency],
    };

    const flowResponse = await flowApiInstance.post(`/plan/upsert`, flowData, {
      headers: { id: config.apiFlowKey },
    });

    responses.push({
      method: "flow",
      planId: flowResponse.data.data.planId,
      price: flowResponse.data.data.amount,
    });
    const reveniuResponse = await reveniuApiInstance.post(
      `/plan/upsert`,
      reveniuData,
      { headers: { id: config.apiReveniuKey } }
    );

    responses.push({
      method: "reveniu",
      planId: reveniuResponse.data.data.id,
      price: reveniuResponse.data.data.price,
    });
    sendResponse(req, res, responses);
  } catch (e: any) {
    console.log({ Error: e.response?.data || e.message });
    return next(boom.badImplementation(e.response?.data || e.message));
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {method} = req.body

    let responses 

    if(method === 'reveniu'){
        const reveniuResponse = await reveniuApiInstance.get('/plan/getAll')
        sendResponse(req, res, reveniuResponse.data)
    }
    if(method === 'flow'){
        const flowResponse = await flowApiInstance.get('/plan/getAll')
        sendResponse(req, res, flowResponse.data.data)
    }
    if(method === 'all'){
        const flowResponse = await flowApiInstance.get('/plan/getAll')
        const reveniuResponse = await reveniuApiInstance.get('/plan/getAll')
        responses = {
            flow: {...flowResponse.data.data},
            reveniu: {...reveniuResponse.data.data.data.results},
        }
        sendResponse(req, res, responses)
    }
  } catch (e: any) {
    console.log({ Error: e.response?.data || e.message });
    return next(boom.badImplementation(e.response?.data || e.message));
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { method, plan_id } = req.query
        if(method === 'reveniu'){
            const reveniuResponse = await reveniuApiInstance.get(`/plan/getById/${plan_id}`)
            sendResponse(req, res, reveniuResponse.data.data)
        }
        if(method === 'flow'){
            const flowResponse = await flowApiInstance.get(`/plan/getById/${plan_id}`)
            sendResponse(req, res, flowResponse.data.data)
        }
    } catch (e: any) {
        console.log({ Error: e.response?.data || e.message });
        return next(boom.badImplementation(e.response?.data || e.message));
    }
};

export { upsert, getAll, getById };
