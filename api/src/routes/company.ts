import { Router } from "express";

import auth from "../middlewares/auth";
import {
  getByRut,
  create,
  getAll,
  getProductsAndInsuredById,
  getLeadsByRut,
} from "../controllers/company";

const CompanyRouter = Router();

CompanyRouter.get("/getByRut/:rut", auth, getByRut);
CompanyRouter.get(
  "/getProductsAndInsuredById/:id",
  auth,
  getProductsAndInsuredById
);
CompanyRouter.post("/create", auth, create);
CompanyRouter.get("/getAll", auth, getAll);
CompanyRouter.get("/getLeadsByRut/:id", auth, getLeadsByRut);

export default CompanyRouter;
