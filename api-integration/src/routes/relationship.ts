import { Router } from "express";

import auth from "../middlewares/auth";
import { getAll } from "../controllers/relationship";
import { extractAgentIdMiddleware } from "../middlewares/token";

const relationShipRouter = Router();

relationShipRouter.get("/getAll", auth, extractAgentIdMiddleware, getAll);

export default relationShipRouter;
