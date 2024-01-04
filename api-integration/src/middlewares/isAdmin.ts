import jwt from "jsonwebtoken";
import config from "../util/config";
import { NextFunction, Request, Response } from "express";

export default function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Authorization token must be provided");
  }

  if (!config.clerkPemKey) {
    return res.status(500).send("Public key is not available");
  }

  const formattedClerkPemKey = `-----BEGIN PUBLIC KEY-----\n${config.clerkPemKey}\n-----END PUBLIC KEY-----`;

  jwt.verify(token, formattedClerkPemKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).send("Failed to authenticate token");
    }

    // Get the roles from decoded token
    const userRoles: { [key: string]: string } = decoded.publicMeta.roles;

    // Check if any of the values are "admin"
    const hasAdminRole = Object.values(userRoles).includes("admin");

    if (hasAdminRole) {
      return next(); // User has the admin role, so proceed to the next middleware
    }

    return res
      .status(403)
      .send("You do not have the required permissions for this route");
  });
}
