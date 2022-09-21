import { Router } from "express";

import auth from "../middlewares/auth";
import {
  getByRutController,
  createController,
  getProductsAndInsuredByIdController,
} from "../controllers/company";

const CompanyRouter = Router();

CompanyRouter.get("/getByRut/:rut", auth, getByRutController);
CompanyRouter.get(
  "/getProductsAndInsuredById/:id",
  auth,
  getProductsAndInsuredByIdController
);
CompanyRouter.post("/create", auth, createController);

export default CompanyRouter;
