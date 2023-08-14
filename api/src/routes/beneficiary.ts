import { Router } from "express";

import auth from "../middlewares/auth";
import {
  getByRutController,
  createController,
} from "../controllers/beneficiary";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const BeneficiaryRouter = Router();

BeneficiaryRouter.get("/getByRut/:rut", auth, getByRutController);
BeneficiaryRouter.post("/create", auth, isAuthenticated, isAdmin, createController);

export default BeneficiaryRouter;
