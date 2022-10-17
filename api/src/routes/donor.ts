import { Router } from "express";

import auth from "../middlewares/auth";
import { getByRutController, createController } from "../controllers/donor";

const DonorRouter = Router();

DonorRouter.get("/getByRut/:rut", auth, getByRutController);
DonorRouter.post("/create", auth, createController);

export default DonorRouter;
