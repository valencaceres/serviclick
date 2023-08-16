import jwt from "jsonwebtoken";
import config from "../util/config";
import { NextFunction, Request, Response } from "express";

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { clerkPemKey } = config;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Not signed in" });
    return;
  }

  if (!clerkPemKey) {
    res.status(500).json({ error: "Public key is not available" });
    return;
  }

  // Here, we're adding the headers and footers to the public key
  const formattedClerkPemKey = `-----BEGIN PUBLIC KEY-----\n${clerkPemKey}\n-----END PUBLIC KEY-----`;

  let decoded: string | object;
  try {
    decoded = jwt.verify(token, formattedClerkPemKey, {
      algorithms: ["RS256"],
    });
    res.locals.sessToken = decoded; // Setting it to locals, so that it can be used later in the chain
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
    return;
  }

  return next(); // Call the next middleware or final request handler
}
