import { Router } from "express";

import auth from "../middlewares/auth";
import {
  createStage,
  updateStage,
  deleteStage,
  getStage,
  getAllStages,
} from "../controllers/stage";

const StageRouter = Router();

StageRouter.post("/create", auth, createStage);
StageRouter.put("/update/:id", auth, updateStage);
StageRouter.delete("/delete/:id", auth, deleteStage);
StageRouter.get("/get/:id", auth, getStage);
StageRouter.get("/getAll", auth, getAllStages);

export default StageRouter;
