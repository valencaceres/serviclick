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
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const PartnerRouter = Router();

PartnerRouter.post("/create", auth, isAuthenticated, isAdmin, create);
PartnerRouter.get("/getAll", auth, getAll);
PartnerRouter.get("/getById/:id", auth, getById);
PartnerRouter.get("/getByRut/:rut", auth, getByRut);
PartnerRouter.get("/getFamilies", auth, getFamilies);
PartnerRouter.delete("/deletePartner/:id", auth, isAuthenticated, isAdmin, deletePartner);
PartnerRouter.get("/getBySpecialtyId/:id", auth, getBySpecialtyId);
PartnerRouter.get("/getByName/:name", auth, getByName);
PartnerRouter.get("/getByFamilyId/:id", auth, getByFamilyId);

export default PartnerRouter;
