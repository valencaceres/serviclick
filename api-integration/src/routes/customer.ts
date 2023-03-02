import { Router } from "express";

import auth from "../middlewares/auth";
import { getByRut, create, deleteByRut } from "../controllers/customer";

const CustomerRouter = Router();

CustomerRouter.get("/getByRut/:rut", auth, getByRut);
CustomerRouter.post("/create", auth, create);
CustomerRouter.delete("/deleteByRut/:rut", auth, deleteByRut);

export default CustomerRouter;
