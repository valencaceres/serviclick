import { Router } from "express";
import multer from "multer";

import auth from "../middlewares/auth";
import {
  create,
  uploadDocument,
  getAll,
  getBeneficiaryByRut,
  getCaseById,
} from "../controllers/case";

const upload = multer();

const CaseRouter = Router();

CaseRouter.post("/create", auth, create);
CaseRouter.post("/uploadDocument", auth, upload.array("files"), uploadDocument);
CaseRouter.get("/all", auth, getAll);
CaseRouter.get("/getBeneficiaryByRut/:rut", auth, getBeneficiaryByRut);
CaseRouter.get("/getById/:id", auth, getCaseById);

export default CaseRouter;
