import { Router } from "express";

import auth from "../middlewares/auth";
import { getByRutController } from "../controllers/customer";

const CustomerRouter = Router();

CustomerRouter.get("/getByRut/:rut", auth, getByRutController);

export default CustomerRouter;
