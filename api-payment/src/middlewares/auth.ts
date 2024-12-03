import config from "../utils/config";
import { NextFunction, Request, Response } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { apiPaymentKey } = config;

  if (req.headers.id !== apiPaymentKey) {
    res.status(401).json({ message: "Incorrect api key in api-payment" });
    return;
  }

  return next();
};

export default auth;