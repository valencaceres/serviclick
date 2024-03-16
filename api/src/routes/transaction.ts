import { Router } from "express";

import auth from "../middlewares/auth";
import {
  getActivesByRutAndProductIdController,
  getByFiltersController,
  getBySubscription,
  changeAmount,
  changeDate,
  changeStatus,
  changeMethod
} from "../controllers/transaction";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const TransactionRouter = Router();
TransactionRouter.get("/getBySubscriptionId/:id", getBySubscription);

TransactionRouter.post(
  "/getActivesByRutAndProductId",
  auth,
  isAuthenticated,
  isAdmin,
  getActivesByRutAndProductIdController
);
TransactionRouter.post(
  "/getByFilters",
  auth,
  isAuthenticated,
  isAdmin,
  getByFiltersController
);
TransactionRouter.post("/changeAmount", changeAmount)
TransactionRouter.post("/changeDate", changeDate)
TransactionRouter.post("/changeStatus", changeStatus)
TransactionRouter.post("/changeMethod", changeMethod)

export default TransactionRouter;
