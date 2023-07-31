import jwt from "jsonwebtoken";
import config from "../util/config";
import { NextFunction, Request, Response } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { apiKey, clerkPemKey } = config;
  const token = req.headers.authorization?.split(" ")[1];

  if (req.headers.id !== apiKey) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!token) {
    res.status(401).json({ error: "Not signed in" });
    return;
  }

  if (!clerkPemKey) {
    res.status(500).json({ error: "Public key is not available" });
    return;
  }

  let formattedClerkPemKey = clerkPemKey.replace(
    "-----BEGIN PUBLIC KEY-----",
    ""
  );
  formattedClerkPemKey = formattedClerkPemKey.replace(
    "-----END PUBLIC KEY-----",
    ""
  );
  formattedClerkPemKey = `-----BEGIN PUBLIC KEY-----\n${formattedClerkPemKey}\n-----END PUBLIC KEY-----`;

  let decoded: string | object;
  try {
    decoded = jwt.verify(token, formattedClerkPemKey, {
      algorithms: ["RS256"],
    });
    console.log(decoded);
    res.locals.sessToken = decoded; // Setting it to locals, so that it can be used later in the chain
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
    return;
  }

  return next(); // Call the next middleware or final request handler
};

export default auth;
