import { Router } from "express";

import auth from "../middlewares/auth";
import { getByRut, create, deleteByRut } from "../controllers/insured";

const InsuredRouter = Router();

InsuredRouter.get("/getByRut/:rut", auth, getByRut);
InsuredRouter.post("/create", auth, create);
InsuredRouter.delete("/deleteByRut/:rut", auth, deleteByRut);

export default InsuredRouter;
