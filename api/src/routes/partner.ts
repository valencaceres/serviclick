import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  getAll,
  getById,
  getByRut,
  getFamilies,
  deletePartner,
  getBySpecialtyId,
  getByName,
  getByFamilyId,
} from "../controllers/partner";

const PartnerRouter = Router();

PartnerRouter.post("/create", auth, create);
PartnerRouter.get("/getAll", auth, getAll);
PartnerRouter.get("/getById/:id", auth, getById);
PartnerRouter.get("/getByRut/:rut", auth, getByRut);
PartnerRouter.get("/getFamilies", auth, getFamilies);
PartnerRouter.delete("/deletePartner/:id", auth, deletePartner);
PartnerRouter.get("/getBySpecialtyId/:id", auth, getBySpecialtyId);
PartnerRouter.get("/getByName/:name", auth, getByName);
PartnerRouter.get("/getByFamilyId/:id", auth, getByFamilyId);

export default PartnerRouter;
