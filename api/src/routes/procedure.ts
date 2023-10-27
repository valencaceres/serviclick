import { Router } from "express";

import auth from "../middlewares/auth";

import { getAll } from "../controllers/procedure";

const ProcedureRouter = Router();

ProcedureRouter.get("/getAll", auth, getAll);

export default ProcedureRouter;
