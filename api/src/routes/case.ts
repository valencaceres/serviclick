import { Router } from "express";

import auth from "../middlewares/auth";
import { create, getBeneficiaryByRut } from "../controllers/case";

const CaseRouter = Router();

CaseRouter.post("/create", auth, create);
CaseRouter.get("/getBeneficiaryByRut/:rut", auth, getBeneficiaryByRut);

export default CaseRouter;
