import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import boom from "@hapi/boom";

import config from "../utils/config";
import { decrypt } from "../utils/crypto";

import * as MUser from "../models/user";

const secretPhrase: string = config.secretPhrase || "default value";
if (secretPhrase === "default value") {
  throw new Error("Secret phrase is not defined");
}

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.baseUrl === "/user") {
      return next();
    }

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return next(
        boom.unauthorized(
          "Protected path, please provide an Authorization header"
        )
      );
    }

    const token = decrypt(authHeader.split(" ")[1]);
    if (!token || token.length === 0) {
      return next(boom.unauthorized("Token not provided"));
    }

    jwt.verify(token, secretPhrase, async (err, decoded) => {
      if (err) {
        return next(boom.unauthorized("Invalid token"));
      }
      const userId = (decoded as any).data.id;

      let usuario = await MUser.getById(userId);
      if (!usuario) {
        return next(boom.notFound("User not found"));
      }
      req.user = usuario;
      next();
    });
  } catch (error) {
    return next(boom.badImplementation((error as Error).message));
  }
};
