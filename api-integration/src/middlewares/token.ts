import pool from "../util/database";
import { NextFunction, Request, Response } from "express";

const extractAgentIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization || req.body.token;
  const token = authorization ? authorization.substring(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const queryResult = await pool.query(
      ` SELECT  tok.integrationuser_id,
                usr.retail_id
        FROM    app.integrationtoken tok
                  inner join app.integrationuser usr on usr.id = tok.integrationuser_id
        WHERE   tok.token = $1`,
      [token]
    );

    if (queryResult.rows.length === 0) {
      return res
        .status(401)
        .json({ success: false, data: null, error: "Invalid token" });
    }

    req.body.retail_id = queryResult.rows[0].retail_id;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, data: null, error: "Invalid token" });
  }
};

export { extractAgentIdMiddleware };
