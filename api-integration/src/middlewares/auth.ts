import config from "../util/config";
import { NextFunction, Request, Response } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { apiKey } = config;

  if (req.headers["api-key"] !== apiKey) {
    res.status(401).json({ message: "Incorrect api key" });
    return;
  }

  return next(); // Call the next middleware or final request handler
};

export default auth;
