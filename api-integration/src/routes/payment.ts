import { Router } from "express";

import auth from "../middlewares/auth";
import { Upsert } from "../controllers/payment";
import { extractAgentIdMiddleware } from "../middlewares/token";

const paymentRouter = Router();

paymentRouter.post("/",auth, extractAgentIdMiddleware, Upsert);

export default paymentRouter;
