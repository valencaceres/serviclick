import { Router } from "express";

import auth from "../middlewares/auth";
import {
  createController,
  getByIdController,
  getBySubscriptionIdController,
} from "../controllers/donation";

const DonationRouter = Router();

DonationRouter.get("/getById/:id", auth, getByIdController);
DonationRouter.get(
  "/getBySubscriptionId/:subscription_id",
  auth,
  getBySubscriptionIdController
);
DonationRouter.post("/create", auth, createController);

export default DonationRouter;
