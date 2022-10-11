import { Router } from "express";

import auth from "../middlewares/auth";
import {
  getActivesByRutAndProductIdController,
  getByFiltersController,
} from "../controllers/transaction";

const TransactionRouter = Router();

TransactionRouter.post(
  "/getActivesByRutAndProductId",
  auth,
  getActivesByRutAndProductIdController
);
TransactionRouter.post("/getByFilters", auth, getByFiltersController);

export default TransactionRouter;
