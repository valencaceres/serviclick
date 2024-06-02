import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/sendResponse";
import boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../utils/config";

import * as User from "../models/User";
import * as UserRol from "../models/UserRol";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await User.getAll();
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
    const response = await User.getById(id);
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
    const response = await User.getByRut(rut);
    sendResponse(req, res, response);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const getByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.params;
    const response = await User.getByEmail(email);
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
    const {
      rut,
      name,
      paternalLastName,
      maternalLastName,
      email,
      phone,
      address,
      birthdate,
      district_id,
    } = req.body;

    const response = await User.upsert(
      rut,
      name,
      paternalLastName,
      maternalLastName,
      email,
      phone,
      address,
      birthdate,
      district_id
    );
    sendResponse(req, res, response);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const response = await User.deleteById(id);
    sendResponse(req, res, response);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await User.updatePassword(id, hashedPassword);
    sendResponse(req, res, response);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const validate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const { jwtSecret } = config;

    const resultUser = await User.getByEmail(email);

    if (!resultUser) {
      return next(boom.badImplementation("User not found"));
    }

    const isValid = await bcrypt.compare(password, resultUser.hash);

    if (!isValid) {
      return next(boom.unauthorized("Invalid credentials"));
    }

    const roles = resultUser.roles.map((role: any) => ({
      id: role.id,
      code: role.code,
      name: role.name,
    }));

    const token = jwt.sign(resultUser, jwtSecret, {
      expiresIn: "1h",
    }) as string;

    sendResponse(req, res, token);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const assignRol = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { rolId } = req.body;
    const response = await UserRol.assignRol(id, rolId);
    sendResponse(req, res, response);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

const removeRol = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { rolId } = req.body;
    const response = await UserRol.removeRol(id, rolId);
    sendResponse(req, res, response);
  } catch (e: any) {
    return next(boom.badImplementation(e));
  }
};

export {
  getAll,
  getById,
  getByRut,
  getByEmail,
  upsert,
  deleteById,
  updatePassword,
  validate,
  assignRol,
  removeRol,
};
