import { Router } from "express";
import multer from "multer";

import auth from "../middlewares/auth";
import {
  create,
  uploadDocument,
  getAll,
  getBeneficiaryByRut,
  getCaseById,
  getAttachById,
  getNewCaseNumber,
} from "../controllers/case";

const upload = multer();

const CaseRouter = Router();

CaseRouter.post("/create", auth, create);
CaseRouter.post("/uploadDocument", auth, upload.array("files"), uploadDocument);
CaseRouter.get("/all", auth, getAll);
CaseRouter.get("/getBeneficiaryByRut/:rut", auth, getBeneficiaryByRut);
CaseRouter.get("/getById/:id", auth, getCaseById);
CaseRouter.get("/getAttachById/:case_id/:casestage_id", auth, getAttachById);
CaseRouter.get("/getNewCaseNumber", auth, getNewCaseNumber);

export default CaseRouter;
