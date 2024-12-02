import { Request, Response, NextFunction } from "express";
import boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../utils/config";
import { sendResponse } from "../utils/sendResponse";

import * as SProduct from "../schemas/product";

import * as MProduct from "../models/product";

const secretPhrase: string = config.secretPhrase || "";

const getByRut = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params } = req;
    const schemaValidate = SProduct.getByRut.validate(params);

    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }

    const { rut } = schemaValidate.value;

    const response = await MProduct.getByRut(rut);

    if (!response) {
      return next(boom.notFound("Customer not found"));
    }

    return sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

export { getByRut };
