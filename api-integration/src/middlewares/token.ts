import pool from "../util/database";
import { NextFunction, Request, Response } from "express";

const extractAgentIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization || req.body.token;
const token = authorization ? authorization.substring(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  try {

    const queryResult = await pool.query(
      'SELECT agent_id FROM app.integrationtoken WHERE token = $1',
      [token]
    );

    if (queryResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.body.agent_id = queryResult.rows[0].agent_id;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export { extractAgentIdMiddleware}