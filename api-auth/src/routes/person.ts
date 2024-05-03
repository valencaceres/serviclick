import { Router } from "express";

import auth from "../middlewares/auth";

import {
  getAll,
  getById,
  getByRut,
  upsert,
  deleteById,
} from "../controllers/person";

const personRouter = Router();

personRouter.get("/getAll", auth, getAll);
personRouter.get("/getById/:id", auth, getById);
personRouter.get("/getByRut/:code", auth, getByRut);
personRouter.post("/upsert", auth, upsert);
personRouter.delete("/deleteById:id", auth, deleteById);

export default personRouter;
