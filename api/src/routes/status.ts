import { Router } from "express";

import auth from "../middlewares/auth";
import { getAllController } from "../controllers/status";

const StatusRouter = Router();

StatusRouter.get("/getAll", auth, getAllController);

export default StatusRouter;
