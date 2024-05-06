import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/sendResponse";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";

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

    const resultUser = await User.validate(email);
    if (!resultUser) {
      return next(boom.badImplementation("User not found"));
    }

    const hashPassword = resultUser.password;
    const isValid = await bcrypt.compare(password, hashPassword);

    const response = isValid
      ? { ...resultUser, password: undefined }
      : { error: "User not valid" };

    sendResponse(req, res, response);
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
    const response = await UserRol.assignRol(id);
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
  upsert,
  deleteById,
  updatePassword,
  validate,
  assignRol,
  removeRol,
};
