import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  deleteById,
  getAll,
  getById,
  getByRut,
  getFamilies,
  getAssistances,
  getByFamilyAssistance,
  getBySpecialtyId,
  getByName,
  getByDistrict,
} from "../controllers/specialist";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const SpecialistRouter = Router();

SpecialistRouter.post("/create", auth, isAuthenticated, isAdmin, create);
SpecialistRouter.delete("/deleteById/:id", auth, isAuthenticated, isAdmin, deleteById);
SpecialistRouter.get("/getAll", auth, getAll);
SpecialistRouter.get("/getById/:id", auth, getById);
SpecialistRouter.get("/getFamilies", auth, getFamilies);
SpecialistRouter.get("/getAssistances/:family_id", auth, getAssistances);
SpecialistRouter.get("/getByFamilyAssistance/:family_id/:assistance_id", auth, getByFamilyAssistance);
SpecialistRouter.get("/getByRut/:rut", auth, getByRut);
SpecialistRouter.get("/getBySpecialtyId/:id", auth, getBySpecialtyId);
SpecialistRouter.get("/getByName/:name", auth, getByName);
SpecialistRouter.get("/getByDistrict/:district/:assistance_id", auth, getByDistrict);

export default SpecialistRouter;
