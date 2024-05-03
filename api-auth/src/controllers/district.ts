import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/sendResponse";
import boom from "@hapi/boom";

import * as District from "../models/District";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await District.getAll();
    sendResponse(req, res, response);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const response = await District.getById(id);
    sendResponse(req, res, response);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

export { getAll, getById };
