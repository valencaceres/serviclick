import { Router } from "express";

import auth from "../middlewares/auth";
import {
  assignPassword,
  validate,
  getByEmail,
} from "../controllers/userCompany";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const UserRouter = Router();

UserRouter.post("/assignPassword", auth, isAuthenticated, isAdmin, assignPassword);
UserRouter.post("/validate", auth, isAuthenticated, isAdmin, validate);
UserRouter.get("/getByEmail/:email", auth, getByEmail);

export default UserRouter;
