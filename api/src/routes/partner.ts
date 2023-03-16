import { Router } from "express";

import auth from "../middlewares/auth";
import { create, getAll, getById, getFamilies } from "../controllers/partner";

const PartnerRouter = Router();

PartnerRouter.post("/create", auth, create);
PartnerRouter.get("/getAll", auth, getAll);
PartnerRouter.get("/getById/:id", auth, getById);
PartnerRouter.get("/getFamilies", auth, getFamilies);

export default PartnerRouter;
