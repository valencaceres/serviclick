import { Router } from "express";

import auth from "../middlewares/auth";
import { create, getBeneficiaryByRut, getCaseById } from "../controllers/case";

const CaseRouter = Router();

CaseRouter.post("/create", auth, create);
CaseRouter.get("/getBeneficiaryByRut/:rut", auth, getBeneficiaryByRut);
CaseRouter.get("/getById/:id", auth, getCaseById);

export default CaseRouter;
