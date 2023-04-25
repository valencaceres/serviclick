import { Router } from "express";

import auth from "../middlewares/auth";
import {
  createController,
  addBeneficiariesController,
  getByIdController,
  getBySubscriptionIdController,
  getProductByInsuredIdController,
  getProductValuesByInsuredId,
  addProduct
} from "../controllers/lead";

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

export default LeadRouter;
