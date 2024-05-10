import { Router } from "express";

import auth from "../middlewares/auth";
import {
  getAll,
  getById,
  upsert,
  deleteById,
  assignAction,
  removeAction,
} from "../controllers/rol";

const rolRouter = Router();

rolRouter.get("/getAll", auth, getAll);
rolRouter.get("/getById/:id", auth, getById);
rolRouter.post("/upsert", auth, upsert);
rolRouter.delete("/deleteById/:id", auth, deleteById);
rolRouter.put("/assignAction/:id", auth, assignAction);
rolRouter.delete("/removeAction/:id", auth, removeAction);

export default rolRouter;
