import { Router } from "express";
import * as Plans from "../controllers/plan";
import auth from "../middlewares/auth";

const PlanRouter = Router();

PlanRouter.get("/getAll", auth, Plans.getAll);
PlanRouter.get("/getById/:id", auth, Plans.getById);
PlanRouter.post("/upsert", auth, Plans.upsert);

export default PlanRouter;
