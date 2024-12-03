import { Router } from "express";
import * as Plan from "../controllers/plan";
import auth from "../middlewares/auth";

const PlanRouter = Router();

PlanRouter.get("/getAll", auth, Plan.getAll);
PlanRouter.get("/getById/:id", auth, Plan.getById);
PlanRouter.post("/upsert", auth, Plan.upsert);

export default PlanRouter;
