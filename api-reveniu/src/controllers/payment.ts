import { NextFunction, Request, Response } from "express";
import { reveniuApiInstance } from "../utils/api";
import sendResponse from "../utils/sendResponse";
import boom from '@hapi/boom'

const getPaymentsBySuscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const {id} = req.params
      const response = await reveniuApiInstance.get(`/subscriptions/${id}/payments`) 
      sendResponse(req, res, response.data)
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
}

const getPaymentByDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {date_start, date_end} = req.body
    const response = await reveniuApiInstance.get(`/payments?filters=true&date_start=${date_start}&date_end=${date_end}`, req.body)
    sendResponse(req, res, response.data)
  } catch (e:any) {
    return next(boom.badImplementation(e));
  }
}

const createPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params
    const {amount} = req.body
    const response = await reveniuApiInstance.post(`/subscriptions/${id}/payments/authorize/`, amount)
    sendResponse(req, res, response.data)
  } catch (e:any) {
    return next(boom.badImplementation(e));
  }
}

const duedayBySuscription = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { new_day } = req.body;
    if (!new_day) {
      return res.status(400).json({ error: "new_day is required" });
    }
    const requestBody = { new_day };
    const response = await reveniuApiInstance.post(`/subscriptions/${id}/dueday/`, requestBody);
    sendResponse(req, res, response.data);
  } catch (e: any) {
    return next(boom.badImplementation(e.message));
  }
};

const sendLinkBySuscriptionId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { subs } = req.body;
    if (!subs || !Array.isArray(subs)) {
      return res.status(400).json({ error: "subs is required and must be an array" });
    }
    const requestBody = { subs };
    const response = await reveniuApiInstance.post('/subscriptions/change_method/', requestBody);
    sendResponse(req, res, response.data);
  } catch (e: any) {
    return next(boom.badImplementation(e.message));
  }
};

const changeAmount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount } = req.body;
    const { id } = req.params;

    if (amount === undefined || typeof amount !== 'number') {
      return res.status(400).json({ error: "amount is required and must be a number" });
    }

    const requestBody = { amount };

    const response = await reveniuApiInstance.post(`/subscriptions/${id}/amount/`, requestBody);

    sendResponse(req, res, response.data);
  } catch (e: any) {
    console.error("Error calling Reveniu API:", e.message);
    return next(boom.badImplementation(e.message));
  }
};

export {getPaymentsBySuscription, getPaymentByDate, createPayment, duedayBySuscription,sendLinkBySuscriptionId, changeAmount}