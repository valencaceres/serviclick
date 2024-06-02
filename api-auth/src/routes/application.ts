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

applicationRouter.get("/getAll", getAll);
applicationRouter.get("/getById/:id", getById);
applicationRouter.get("/getByCode/:code", getByCode);
applicationRouter.post("/upsert", upsert);
applicationRouter.delete("/deleteById:id", deleteById);

export default applicationRouter;
