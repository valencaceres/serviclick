import { Request, Response, NextFunction } from "express";
import boom from "@hapi/boom";

import config from "../utils/config";
import { sendResponse } from "../utils/sendResponse";

import * as STicket from "../schemas/ticket";

import * as MTicket from "../models/ticket";

const secretPhrase: string = config.secretPhrase || "";

const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params } = req;
    const schemaValidate = STicket.getById.validate(params);

    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }

    const { id } = schemaValidate.value;

    const response = await MTicket.getById(id);

    if (!response) {
      return next(boom.notFound("Ticket not found"));
    }

    return sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const getByRut = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params } = req;
    const schemaValidate = STicket.getByRut.validate(params);

    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }

    const { rut } = schemaValidate.value;

    const response = await MTicket.getByRut(rut);

    if (!response) {
      return next(boom.notFound("Ticket not found"));
    }

    return sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const upsert = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    const schemaValidate = STicket.upsert.validate(body);

    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }

    const {
      leadId,
      beneficiaryId,
      assistanceId,
      eventDescription,
      scheduledDateFrom,
      scheduledDateTo,
      scheduledTimeFrom,
      scheduledTimeTo,
      id,
    } = schemaValidate.value;

    const response = await MTicket.upsert(
      leadId,
      beneficiaryId,
      assistanceId,
      eventDescription,
      scheduledDateFrom,
      scheduledDateTo,
      scheduledTimeFrom,
      scheduledTimeTo,
      id
    );

    if (!response) {
      return next(boom.notFound("Ticket not created"));
    }

    return sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

export { getById, getByRut, upsert };
