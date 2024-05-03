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

actionRouter.get("/getAll", auth, getAll);
actionRouter.get("/getById/:id", auth, getById);
actionRouter.get("/getByCode/:code", auth, getByCode);
actionRouter.get(
  "/getByApplicationId/:application_id",
  auth,
  getByApplicationId
);
actionRouter.post("/upsert", auth, upsert);
actionRouter.delete("/deleteById:id", auth, deleteById);

export default actionRouter;
