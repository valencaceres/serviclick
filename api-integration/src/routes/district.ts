import { Router } from "express";

import auth from "../middlewares/auth";
import { extractAgentIdMiddleware } from "../middlewares/token";
import { getAll } from "../controllers/district";

const DistrictRouter = Router();

DistrictRouter.get("/getAll", extractAgentIdMiddleware, getAll);

export default DistrictRouter;
