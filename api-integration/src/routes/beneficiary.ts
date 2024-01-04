import { Router } from "express";

import auth from "../middlewares/auth";
import { getByRut } from "../controllers/beneficiary";
import { extractAgentIdMiddleware } from "../middlewares/token";

const beneficiaryRouter = Router();

beneficiaryRouter.get("/getByRut/:rut",auth, extractAgentIdMiddleware, getByRut);

export default beneficiaryRouter;
