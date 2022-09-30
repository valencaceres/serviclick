import { Router } from "express";

import auth from "../middlewares/auth";
import { getByFiltersController } from "../controllers/transaction";

const TransactionRouter = Router();

TransactionRouter.post("/getByFilters", auth, getByFiltersController);

export default TransactionRouter;
