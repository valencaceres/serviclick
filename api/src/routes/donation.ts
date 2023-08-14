import { Router } from "express";

import auth from "../middlewares/auth";
import {
  createController,
  getByIdController,
  getBySubscriptionIdController,
} from "../controllers/donation";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const DonationRouter = Router();

DonationRouter.get("/getById/:id", auth, getByIdController);
DonationRouter.get("/getBySubscriptionId/:subscription_id", auth, getBySubscriptionIdController);
DonationRouter.post("/create", auth, isAuthenticated, isAdmin, createController);

export default DonationRouter;
