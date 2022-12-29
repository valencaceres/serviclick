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
} from "../controllers/specialty";

const SpecialtyRouter = Router();

SpecialtyRouter.post("/create", auth, createSpecialty);
SpecialtyRouter.put("/update/:id", auth, updateSpecialty);
SpecialtyRouter.delete("/delete/:id", auth, deleteSpecialty);
SpecialtyRouter.get("/get/:id", auth, getSpecialty);
SpecialtyRouter.get("/getAllSpecialties", auth, getAllSpecialties);
SpecialtyRouter.get("/families", auth, getFamilies);
SpecialtyRouter.get(
  "/getSpecialtiesByFamilyId/:family_id",
  auth,
  getSpecialtiesByFamilyId
);

export default SpecialtyRouter;
