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

rolRouter.get("/getAll", getAll);
rolRouter.get("/getById/:id", getById);
rolRouter.post("/upsert", upsert);
rolRouter.delete("/deleteById/:id", deleteById);
rolRouter.put("/assignAction/:id", assignAction);
rolRouter.delete("/removeAction/:id", removeAction);

export default rolRouter;
