import { Router } from "express";
import fileUpload from "express-fileupload";

import multer from "multer";

import auth from "../middlewares/auth";
import {
  create,
  uploadDocument,
  getAll,
  getBeneficiaryByRut,
  getById,
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
  getAllReimbursments,
  updateReimbursment,
  updateReimbursementStatus,
  createChatMessage,
  getChatByCase,
  getStatistics,
  createCaseSummary,
  getApplicantByRut,
  getServicesAndValues,
  upsert,
  getRetails,
  getStatus,
} from "../controllers/case";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

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
CaseRouter.get("/getAll", auth, getAll);
CaseRouter.get("/getRetails", auth, getRetails);
CaseRouter.get("/getStatus", auth, getStatus);
CaseRouter.get("/getBeneficiaryByRut/:rut", auth, getBeneficiaryByRut);
CaseRouter.get("/getById/:id",auth, getById);
CaseRouter.get("/getAttachById/:case_id/:casestage_id", auth, getAttachById);
CaseRouter.get("/getAttachByIdAdmin/:case_id", auth, getAttachById);

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
CaseRouter.post("/createCaseSummary", auth, createCaseSummary);
CaseRouter.get("/getApplicantByRut/:rut", auth, getApplicantByRut);
CaseRouter.post("/getServicesAndValues", getServicesAndValues);
CaseRouter.post("/upsert", auth, upsert);
CaseRouter.put("/updateReimbursment/:id", auth, isAdmin, updateReimbursment);
CaseRouter.get("/getReimbursments", getAllReimbursments);

export default CaseRouter;
