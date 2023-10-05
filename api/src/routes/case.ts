import { Router } from "express";
import fileUpload from "express-fileupload";

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
  discountAssistanceData,
  getReimbursment,
  getAllReimbursements,
  updateReimbursementStatus,
  createChatMessage,
  getChatByCase,
  getStatistics,
} from "../controllers/case";
import isAuthenticated from "../middlewares/isAuthenticated";

const CaseRouter = Router();

CaseRouter.post("/create", auth, create);
CaseRouter.post(
  "/uploadDocument",
  auth,
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  uploadDocument
);
CaseRouter.get("/all", auth, getAll);
CaseRouter.get("/getBeneficiaryByRut/:rut", auth, getBeneficiaryByRut);
CaseRouter.get("/getById/:id", auth, getCaseById);
CaseRouter.get("/getAttachById/:case_id/:casestage_id", auth, getAttachById);
CaseRouter.get("/getNewCaseNumber", auth, getNewCaseNumber);
CaseRouter.post("/assignPartner", auth, isAuthenticated, assignPartner);
CaseRouter.get(
  "/getAssignedPartner/:case_id/:casestage_id",
  auth,
  getAssignedPartner
);
CaseRouter.post("/assignSpecialist", auth, isAuthenticated, assignSpecialist);
CaseRouter.get(
  "/getAssignedSpecialist/:case_id/:casestage_id",
  auth,
  getAssignedSpecialist
);
CaseRouter.post("/reimburse", auth, isAuthenticated, reimburse);
CaseRouter.get(
  "/getAssistanceData/:insured_id/:assistance_id/:product_id",
  auth,
  getAssistanceData
);
CaseRouter.put(
  "/discountAssistanceData/:insured_id/:assistance_id/:product_id",
  auth,
  discountAssistanceData
);
CaseRouter.get("/getReimbursment/:case_id", auth, getReimbursment);
CaseRouter.get("/getAllReimbursements", auth, getAllReimbursements);
CaseRouter.put(
  "/updateReimbursementStatus",
  auth,
  isAuthenticated,
  updateReimbursementStatus
);
CaseRouter.post("/createChatMessage", auth, isAuthenticated, createChatMessage);
CaseRouter.get("/getChatByCase/:case_id", auth, getChatByCase);
CaseRouter.get("/getStatistics", auth, getStatistics);
export default CaseRouter;
