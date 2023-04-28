import { Router } from "express";

import auth from "../middlewares/auth";
import { getByRut, getProfile, create, getById } from "../controllers/insured";

const InsuredRouter = Router();

InsuredRouter.get("/getByRut/:rut", auth, getByRut);
InsuredRouter.get("/getProfile/:rut", auth, getProfile);
InsuredRouter.post("/create", auth, create);
InsuredRouter.get("/getById/:id", auth, getById);

export default InsuredRouter;
