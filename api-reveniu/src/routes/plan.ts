import { Router } from "express";
import * as Plan from "../controllers/plan";
import auth from "../middlewares/auth";

const RPlan = Router();

RPlan.get("/getAll", auth, Plan.getAll);
RPlan.get("/getById/:id", auth, Plan.getById);
RPlan.post("/upsert", auth, Plan.upsert);

export default RPlan;
