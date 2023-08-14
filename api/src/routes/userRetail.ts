import { Router } from "express";

import auth from "../middlewares/auth";
import {
  assignPassword,
  validate,
  getByEmail,
  sendCredentials,
  updatePassword,
} from "../controllers/userRetail";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const UserRetailRouter = Router();

UserRetailRouter.post("/assignPassword", auth, isAuthenticated, isAdmin, assignPassword);
UserRetailRouter.post("/validate", auth, isAuthenticated, isAdmin, validate);
UserRetailRouter.post("/sendCredentials", auth, isAuthenticated, isAdmin, sendCredentials);
UserRetailRouter.post("/updatePassword", auth, isAuthenticated, isAdmin, updatePassword);
UserRetailRouter.get("/getByEmail/:retail_rut/:email", auth, getByEmail);

export default UserRetailRouter;
