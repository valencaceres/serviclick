import { NextFunction, Request, Response } from "express";
import { reveniuApiInstance } from "../utils/api";
import sendResponse from "../utils/sendResponse";
import boom from "@hapi/boom";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { plan_id, field_values } = req.body;
    const requestData = {
      plan_id,
      field_values,
    };

    const response = await reveniuApiInstance.post(
      "/subscriptions/",
      requestData
    );

    sendResponse(req, res, response.data);
  } catch (e: any) {
    return next(boom.badImplementation(e.response));
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await reveniuApiInstance.get("/subscriptions/");
    sendResponse(req, res, response.data);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const response = await reveniuApiInstance.get(`/subscriptions/${id}`);
    sendResponse(req, res, response.data);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const getByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params;
    const response = await reveniuApiInstance.get(
      `/subscriptions/search?email=${email}`
    );
    sendResponse(req, res, response.data);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const getInterationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const response = await reveniuApiInstance.get(
      `/subscriptions/${id}/interactions/`
    );
    sendResponse(req, res, response.data);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const reactivateByid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const response = await reveniuApiInstance.post(
      `/subscriptions/reactivate/${id}/`
    );
    sendResponse(req, res, response.data);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const disableById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const response = await reveniuApiInstance.post(
      `/subscriptions/${id}/disable/`
    );
    sendResponse(req, res, response.data);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const disableRenewById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const response = await reveniuApiInstance.post(
      `/subscriptions/${id}/disablerenew/`
    );
    sendResponse(req, res, response.data);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

export {
  getAll,
  getById,
  getByEmail,
  getInterationById,
  reactivateByid,
  disableById,
  disableRenewById,
  create,
};
