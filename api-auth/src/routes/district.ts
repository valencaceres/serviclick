import { Router } from "express";

import auth from "../middlewares/auth";

import { getAll, getById } from "../controllers/district";

const districtRouter = Router();

districtRouter.get("/getAll", auth, getAll);
districtRouter.get("/getById/:id", auth, getById);

export default districtRouter;
