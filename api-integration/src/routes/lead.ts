import { Router } from "express";

import auth from "../middlewares/auth";
import { Upsert } from "../controllers/lead";
import { extractAgentIdMiddleware } from "../middlewares/token";

const leadRouter = Router();

leadRouter.post("/", auth, extractAgentIdMiddleware, Upsert);

export default leadRouter;
