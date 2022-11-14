import { Router } from "express";

import auth from "../middlewares/auth";
import {
  assignPassword,
  validate,
  getByEmail,
  sendCredentials,
  updatePassword,
} from "../controllers/userRetail";

const UserRetailRouter = Router();

UserRetailRouter.post("/assignPassword", auth, assignPassword);
UserRetailRouter.post("/validate", auth, validate);
UserRetailRouter.post("/sendCredentials", auth, sendCredentials);
UserRetailRouter.post("/updatePassword", auth, updatePassword);
UserRetailRouter.get("/getByEmail/:retail_rut/:email", auth, getByEmail);

export default UserRetailRouter;
