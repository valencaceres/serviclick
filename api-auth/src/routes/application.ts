import { Router } from "express";

import auth from "../middlewares/auth";

import {
  getAll,
  getById,
  getByCode,
  upsert,
  deleteById,
} from "../controllers/application";

const applicationRouter = Router();

applicationRouter.get("/getAll", auth, getAll);
applicationRouter.get("/getById/:id", auth, getById);
applicationRouter.get("/getByCode/:code", auth, getByCode);
applicationRouter.post("/upsert", auth, upsert);
applicationRouter.delete("/deleteById:id", auth, deleteById);

export default applicationRouter;
