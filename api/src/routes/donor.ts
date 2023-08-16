import { Router } from "express";

import auth from "../middlewares/auth";
import { getByRutController, createController } from "../controllers/donor";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const DonorRouter = Router();

DonorRouter.get("/getByRut/:rut", auth, getByRutController);
DonorRouter.post("/create", auth, isAuthenticated, isAdmin, createController);

export default DonorRouter;
