import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  deleteById,
  getAll,
  getById,
  getFamilies,
  getAssistances,
  getByFamilyAssistance,
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

export default SpecialistRouter;
