import { Router } from "express";

import auth from "../middlewares/auth";
import { Upsert } from "../controllers/document";
import { extractAgentIdMiddleware } from "../middlewares/token";

const documentRouter = Router();

documentRouter.post("/",auth, extractAgentIdMiddleware, Upsert);

export default documentRouter;
