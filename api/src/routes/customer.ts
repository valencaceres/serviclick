import { Router } from "express";

import auth from "../middlewares/auth";
import { getByRutController, create } from "../controllers/customer";

const CustomerRouter = Router();

CustomerRouter.post("/create", auth, create);
CustomerRouter.get("/getByRut/:rut", auth, getByRutController);

export default CustomerRouter;
