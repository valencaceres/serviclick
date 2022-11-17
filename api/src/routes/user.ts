import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  assignPassword,
  validate,
  getByEmail,
  sendCredentials,
  updatePassword,
} from "../controllers/user";

const UserRouter = Router();

UserRouter.post("/create", auth, create);
UserRouter.put("/assignPassword", auth, assignPassword);
UserRouter.post("/validate", auth, validate);
UserRouter.get("/getByEmail/:email", auth, getByEmail);
UserRouter.post("/sendCredentials", auth, sendCredentials);
UserRouter.post("/updatePassword", auth, updatePassword);

export default UserRouter;
