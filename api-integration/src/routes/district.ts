import { Router } from "express";

import auth from "../middlewares/auth";
import { extractAgentIdMiddleware } from "../middlewares/token";
import { listAll } from "../controllers/district";

const DistrictRouter = Router();

DistrictRouter.get("/listAll", extractAgentIdMiddleware,  listAll);

export default DistrictRouter;
