import { Router } from "express";

import auth from "../middlewares/auth";
import { create, getAll, getById, getByRut } from "../controllers/contractor";

const ContractorRouter = Router();

ContractorRouter.post("/create", auth, create);
ContractorRouter.post("/getAll", auth, getAll);
ContractorRouter.get("/getById/:id", auth, getById);
ContractorRouter.get("/getByRut/:rut/:type", auth, getByRut);

export default ContractorRouter;
