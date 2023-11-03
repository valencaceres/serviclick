import { Router } from "express";

import auth from "../middlewares/auth";
import {
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
  getSpecialty,
  getAllSpecialties,
  getSpecialtiesByFamilyId,
  getFamilies,
  getSpecialitiesByAssistance,
  getSpecialtiesByPartner,
} from "../controllers/specialty";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const SpecialtyRouter = Router();

SpecialtyRouter.post(
  "/create",
  auth,
  isAuthenticated,
  isAdmin,
  createSpecialty
);
SpecialtyRouter.put(
  "/update/:id",
  auth,
  isAuthenticated,
  isAdmin,
  updateSpecialty
);
SpecialtyRouter.delete(
  "/delete/:id",
  auth,
  isAuthenticated,
  isAdmin,
  deleteSpecialty
);
SpecialtyRouter.get("/get/:id", auth, getSpecialty);
SpecialtyRouter.get("/getAllSpecialties", auth, getAllSpecialties);
SpecialtyRouter.get("/families", auth, getFamilies);
SpecialtyRouter.get(
  "/getSpecialtiesByFamilyId/:family_id",
  auth,
  getSpecialtiesByFamilyId
);
SpecialtyRouter.get(
  "/getSpecialitiesByAssistance/:id/:assistance_id",
  getSpecialitiesByAssistance
);
SpecialtyRouter.get(
  "/getSpecialitiesByPartner/:id/:assistance_id",
  getSpecialtiesByPartner
);
export default SpecialtyRouter;
