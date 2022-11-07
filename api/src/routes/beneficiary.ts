import { Router } from "express";

import auth from "../middlewares/auth";
import {
  getByRutController,
  createController,
} from "../controllers/beneficiary";

const BeneficiaryRouter = Router();

BeneficiaryRouter.get("/getByRut/:rut", auth, getByRutController);
BeneficiaryRouter.post("/create", auth, createController);

export default BeneficiaryRouter;
