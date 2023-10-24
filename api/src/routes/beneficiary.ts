import { Router } from "express";

import auth from "../middlewares/auth";
import {
  getByRutController,
  createController,
  upsert,
} from "../controllers/beneficiary";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const BeneficiaryRouter = Router();

BeneficiaryRouter.get("/getByRut/:rut", auth, getByRutController);
BeneficiaryRouter.post(
  "/create",
  auth,
  isAuthenticated,
  isAdmin,
  createController
);
BeneficiaryRouter.post("/upsert", auth, upsert);

export default BeneficiaryRouter;
