import { Router } from "express";

import auth from "../middlewares/auth";
import { getByRut, getProfile, create, getById } from "../controllers/insured";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const InsuredRouter = Router();

InsuredRouter.get("/getByRut/:rut", auth, getByRut);
InsuredRouter.get("/getProfile/:rut", auth, getProfile);
InsuredRouter.post("/create", auth, isAuthenticated, isAdmin, create);
InsuredRouter.get("/getById/:id", auth, getById);

export default InsuredRouter;
