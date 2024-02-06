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
  removeBeneficiary,
} from "../controllers/lead";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const upload = multer({ storage: multer.memoryStorage() });

const LeadRouter = Router();

LeadRouter.post("/create", auth, createController);
LeadRouter.post(
  "/addBeneficiaries",
  auth,
  isAuthenticated,
  isAdmin,
  addBeneficiariesController
);
LeadRouter.get("/getById/:id", auth, getByIdController);
LeadRouter.get(
  "/getBySubscriptionId/:subscription_id",
  auth,
  getBySubscriptionIdController
);
LeadRouter.get(
  "/getProductByInsuredId/:insured_id",
  auth,
  isAuthenticated,
  isAdmin,
  getProductByInsuredIdController
);
LeadRouter.get(
  "/getProductValuesByInsuredId/:lead_id/:product_id/:insured_id",
  auth,
  isAuthenticated,
  isAdmin,
  getProductValuesByInsuredId
);
LeadRouter.post("/addProduct", auth, isAuthenticated, isAdmin, addProduct);
LeadRouter.post("/addInsured", auth, isAuthenticated, isAdmin, addInsured);
LeadRouter.post(
  "/addBeneficiary",
  auth,

  addBeneficiary
);
LeadRouter.delete("/removeBeneficiary", auth, isAuthenticated, isAdmin, removeBeneficiary);
LeadRouter.get("/getStatistics", auth, isAuthenticated, isAdmin, getStatistics);
LeadRouter.get(
  "/getContract/:lead_id",
  auth,
  isAuthenticated,
  isAdmin,
  getContract
);
LeadRouter.post(
  "/addInsuredFromExcel",
  auth,
  isAuthenticated,
  isAdmin,
  upload.single("file"),
  addInsuredFromExcel
); // TODO: Eliminar
LeadRouter.post("/addFromCase", auth, addFromCase);

export default LeadRouter;
