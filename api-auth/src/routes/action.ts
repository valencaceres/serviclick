import { Router } from "express";

import auth from "../middlewares/auth";

import {
  getAll,
  getById,
  getByCode,
  getByApplicationId,
  upsert,
  deleteById,
} from "../controllers/action";

const actionRouter = Router();

actionRouter.get("/getAll", getAll);
actionRouter.get("/getById/:id", getById);
actionRouter.get("/getByCode/:code", getByCode);
actionRouter.get("/getByApplicationId/:application_id", getByApplicationId);
actionRouter.post("/upsert", upsert);
actionRouter.delete("/deleteById:id", deleteById);

export default actionRouter;
