import { Router } from "express";

import auth from "../middlewares/auth";
import {
  createFamily,
  updateFamily,
  deleteFamily,
  getFamily,
  listFamilies,
} from "../controllers/family";

const FamilyRouter = Router();

FamilyRouter.post("/create", auth, createFamily);
FamilyRouter.put("/update/:id", auth, updateFamily);
FamilyRouter.delete("/delete/:id", auth, deleteFamily);
FamilyRouter.get("/get/:id", auth, getFamily);
FamilyRouter.get("/list", auth, listFamilies);

export default FamilyRouter;
