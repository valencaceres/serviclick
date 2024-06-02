import { Router } from "express";

import auth from "../middlewares/auth";

import { getAll, getById } from "../controllers/district";

const districtRouter = Router();

districtRouter.get("/getAll", getAll);
districtRouter.get("/getById/:id", getById);

export default districtRouter;
