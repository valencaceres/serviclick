import { Router } from "express";
import multer from "multer";

import auth from "../middlewares/auth";
import {
  createController,
  addBeneficiariesController,
  getByIdController,
  getBySubscriptionIdController,
  getProductByInsuredIdController,
  getProductValuesByInsuredId,
  addProduct,
  addInsured,
  addBeneficiary,
  getStatistics,
  getContract,
  addInsuredFromExcel,
  addFromCase,
} from "../controllers/lead";

const upload = multer({ storage: multer.memoryStorage() });

const LeadRouter = Router();

LeadRouter.post("/create", auth, createController);
LeadRouter.post("/addBeneficiaries", auth, addBeneficiariesController);
LeadRouter.get("/getById/:id", auth, getByIdController);
LeadRouter.get(
  "/getBySubscriptionId/:subscription_id",
  auth,
  getBySubscriptionIdController
);
LeadRouter.get(
  "/getProductByInsuredId/:insured_id",
  auth,
  getProductByInsuredIdController
);
LeadRouter.get(
  "/getProductValuesByInsuredId/:lead_id/:product_id/:insured_id",
  auth,
  getProductValuesByInsuredId
);
LeadRouter.post("/addProduct", auth, addProduct);
LeadRouter.post("/addInsured", auth, addInsured);
LeadRouter.post("/addBeneficiary", auth, addBeneficiary);
LeadRouter.get("/getStatistics", auth, getStatistics);
LeadRouter.get("/getContract/:lead_id", auth, getContract);
LeadRouter.post(
  "/addInsuredFromExcel",
  auth,
  upload.single("file"),
  addInsuredFromExcel
);
LeadRouter.post("/addFromCase", auth, addFromCase);

export default LeadRouter;
