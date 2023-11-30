import { Router } from "express";

import auth from "../middlewares/auth";
import {
  createFamily,
  updateFamily,
  deleteFamily,
  getFamily,
  listFamilies,
} from "../controllers/family";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const FamilyRouter = Router();

FamilyRouter.post("/create", auth, isAuthenticated, isAdmin, createFamily);
FamilyRouter.put("/update/:id", auth, isAuthenticated, isAdmin, updateFamily);
FamilyRouter.delete(
  "/delete/:id",
  auth,
  isAuthenticated,
  isAdmin,
  deleteFamily
);
FamilyRouter.get("/get/:id", auth, getFamily);
FamilyRouter.get("/list", auth, listFamilies);

export default FamilyRouter;
