import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/sendResponse";
import boom from "@hapi/boom";

import * as Person from "../models/Person";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await Person.getAll();
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
    const response = await Person.getById(id);
    sendResponse(req, res, response);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const getByRut = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { rut } = req.params;
    const response = await Person.getByRut(rut);
    sendResponse(req, res, response);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const upsert = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;

    const response = await Person.upsert();
    sendResponse(req, res, response);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const response = await Person.deleteById(id);
    sendResponse(req, res, response);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

export { getAll, getById, getByRut, upsert, deleteById };
