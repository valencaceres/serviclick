import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  getAll,
  getBeneficiaryByRut,
  getCaseById,
} from "../controllers/case";

const CaseRouter = Router();

CaseRouter.post("/create", auth, create);
CaseRouter.get("/all", auth, getAll);
CaseRouter.get("/getBeneficiaryByRut/:rut", auth, getBeneficiaryByRut);
CaseRouter.get("/getById/:id", auth, getCaseById);

export default CaseRouter;
