import { Router } from "express";

import auth from "../middlewares/auth";
import {
  getActivesByRutAndProductIdController,
  getByFiltersController,
} from "../controllers/transaction";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const TransactionRouter = Router();

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

export default TransactionRouter;
