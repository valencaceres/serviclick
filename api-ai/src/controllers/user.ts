import { Request, Response, NextFunction } from "express";
import boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../utils/config";
import { encrypt } from "../utils/crypto";
import { sendResponse } from "../utils/sendResponse";

import * as SUser from "../schemas/user";

import * as MUser from "../models/user";

const secretPhrase: string = config.secretPhrase || "";

const upsert = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    const schemaValidate = SUser.upsert.validate(body);

    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }

    const { email, name } = schemaValidate.value;

    const response = await MUser.upsert(email, name, config.retailId);
    return sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const schemaValidate = SUser.updatePassword.validate(body);

    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }

    const { id, password } = schemaValidate.value;

    const response = await MUser.updatePassword(id, password);
    return sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const validate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    const schemaValidate = SUser.validate.validate(body);

    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }

    const { login, password } = schemaValidate.value;

    const resultUser = await MUser.getByEmail(login);

    if (!resultUser) {
      return next(boom.unauthorized("Credentials are invalid"));
    }

    const { hash, ...resultUserWithoutHash } = resultUser;
    const isValid = await bcrypt.compare(password, hash);

    if (!isValid) {
      return next(boom.unauthorized("Credentials are invalid"));
    }

    console.log(secretPhrase);
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 6,
        data: resultUserWithoutHash,
      },
      secretPhrase
    );

    const encryptedToken = encrypt(token);
    return sendResponse(req, res, encryptedToken);
  } catch (err: any) {
    return next(boom.badImplementation((err as Error).message));
  }
};

export { upsert, updatePassword, validate };
