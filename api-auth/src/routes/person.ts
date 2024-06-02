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

personRouter.get("/getAll", getAll);
personRouter.get("/getById/:id", getById);
personRouter.get("/getByRut/:code", getByRut);
personRouter.post("/upsert", upsert);
personRouter.delete("/deleteById:id", deleteById);

export default personRouter;
