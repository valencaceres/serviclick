import { Router } from "express";

import auth from "../middlewares/auth";
import { getByRut, getProfile, create } from "../controllers/insured";

const InsuredRouter = Router();

InsuredRouter.get("/getByRut/:rut", auth, getByRut);
InsuredRouter.get("/getProfile/:rut", auth, getProfile);
InsuredRouter.post("/create", auth, create);

export default InsuredRouter;
