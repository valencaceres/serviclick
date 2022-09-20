import { Router } from "express";

import auth from "../middlewares/auth";
import { getByRutController, createController } from "../controllers/insured";

const InsuredRouter = Router();

InsuredRouter.get("/getByRut/:rut", auth, getByRutController);
InsuredRouter.post("/create", auth, createController);

export default InsuredRouter;
