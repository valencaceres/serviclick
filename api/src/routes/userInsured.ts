import { Router } from "express";

import auth from "../middlewares/auth";
import {
  assignPassword,
  validate,
  getByEmail,
  restorePassword
} from "../controllers/userInsured";

const UserRouter = Router();

UserRouter.post("/assignPassword", auth, assignPassword);
UserRouter.post("/validate", auth, validate);
UserRouter.get("/getByEmail/:email", auth, getByEmail);
UserRouter.post("/restorePassword", auth, restorePassword);

export default UserRouter;
