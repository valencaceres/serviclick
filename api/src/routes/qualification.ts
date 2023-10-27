import { Router } from "express";

import auth from "../middlewares/auth";

import { getAll } from "../controllers/qualification";

const QualificationRouter = Router();

QualificationRouter.get("/getAll", auth, getAll);

export default QualificationRouter;
