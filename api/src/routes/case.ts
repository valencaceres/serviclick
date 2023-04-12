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
  assignPartner,
  getAssignedPartner,
  assignSpecialist,
  getAssignedSpecialist,
  reimburse,
  getAssistanceData,
  getReimbursment,
  getAllReimbursements,
  updateReimbursementStatus,
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
CaseRouter.post("/assignPartner", auth, assignPartner);
CaseRouter.get(
  "/getAssignedPartner/:case_id/:casestage_id",
  auth,
  getAssignedPartner
);
CaseRouter.post("/assignSpecialist", auth, assignSpecialist);
CaseRouter.get(
  "/getAssignedSpecialist/:case_id/:casestage_id",
  auth,
  getAssignedSpecialist
);
CaseRouter.post("/reimburse", auth, reimburse);
CaseRouter.get(
  "/getAssistanceData/:applicant_id/:assistance_id/:product_id",
  auth,
  getAssistanceData
);
CaseRouter.get("/getReimbursment/:case_id", auth, getReimbursment);
CaseRouter.get("/getAllReimbursements", auth, getAllReimbursements);
CaseRouter.put("/updateReimbursementStatus", auth, updateReimbursementStatus);

export default CaseRouter;
