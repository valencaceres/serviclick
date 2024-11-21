import { Request, Response, NextFunction } from "express";
import boom from "@hapi/boom";

import config from "../utils/config";
import { sendResponse } from "../utils/sendResponse";

import * as SInsured from "../schemas/insured";

import * as MInsured from "../models/insured";

const secretPhrase: string = config.secretPhrase || "";

const getByRut = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params } = req;
    const schemaValidate = SInsured.getByRut.validate(params);

    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }

    const { rut } = schemaValidate.value;

    const response = await MInsured.getByRut(rut);

    if (!response) {
      return next(boom.notFound("Customer not found"));
    }

    return sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

export { getByRut };
