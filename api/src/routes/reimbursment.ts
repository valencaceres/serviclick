import { Router } from "express";

import auth from "../middlewares/auth";
import { getAll, update } from "../controllers/reimbursment";

const ReimbursmentRouter = Router();

ReimbursmentRouter.get("/getAll", auth, getAll);
ReimbursmentRouter.put("/update/:id", auth, update);

export default ReimbursmentRouter;
