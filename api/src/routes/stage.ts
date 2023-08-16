import { Router } from "express";

import auth from "../middlewares/auth";
import {
  createStage,
  updateStage,
  deleteStage,
  getStage,
  getAllStages,
} from "../controllers/stage";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const StageRouter = Router();

StageRouter.post("/create", auth, isAuthenticated, isAdmin, createStage);
StageRouter.put("/update/:id", auth, isAuthenticated, isAdmin, updateStage);
StageRouter.delete("/delete/:id", auth, isAuthenticated, isAdmin, deleteStage);
StageRouter.get("/get/:id", auth, getStage);
StageRouter.get("/getAll", auth, getAllStages);

export default StageRouter;
