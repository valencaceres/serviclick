import { Request, Response, NextFunction } from "express";

import createLogger from "./logger";

export const sendResponse = (
  req: Request,
  res: Response,
  json: any,
  statusCode = 200,
  error = null
) => {
  createLogger.info({
    url: req.originalUrl,
    method: req.method,
    body: req.method === "POST" ? req.body : "",
    params: req.method !== "POST" ? req.params : "",
    query: req.method === "GET" ? req.query : "",
  });

  res.status(statusCode).json({
    success: error ? false : true,
    data: json,
    error,
  });
};

export const sendError = (
  req: Request,
  res: Response,
  error: string,
  message?: string
) => {
  const statusCode = 200;

  createLogger.error({
    url: req.originalUrl,
    method: req.method,
    body: req.method === "POST" ? req.body : "",
    params: req.method !== "POST" ? req.params : "",
    query: req.method === "GET" ? req.query : "",
    error,
  });

  res.status(statusCode).json({
    success: false,
    data: null,
    error: message || error,
  });
};
