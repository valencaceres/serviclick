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
} from "../controllers/specialist";

const SpecialistRouter = Router();

SpecialistRouter.post("/create", auth, create);
SpecialistRouter.delete("/deleteById/:id", auth, deleteById);
SpecialistRouter.get("/getAll", auth, getAll);
SpecialistRouter.get("/getById/:id", auth, getById);
SpecialistRouter.get("/getFamilies", auth, getFamilies);
SpecialistRouter.get("/getAssistances/:family_id", auth, getAssistances);
SpecialistRouter.get(
  "/getByFamilyAssistance/:family_id/:assistance_id",
  auth,
  getByFamilyAssistance
);
SpecialistRouter.get("/getByRut/:rut", auth, getByRut);
SpecialistRouter.get("/getBySpecialtyId/:id", auth, getBySpecialtyId);
SpecialistRouter.get("/getByName/:name", auth, getByName);

export default SpecialistRouter;
