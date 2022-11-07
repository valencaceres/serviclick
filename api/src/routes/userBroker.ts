import { Router } from "express";

import auth from "../middlewares/auth";
import {
  assignPassword,
  validate,
  getByEmail,
  sendCredentials,
  updatePassword,
} from "../controllers/userBroker";

const UserBrokerRouter = Router();

UserBrokerRouter.post("/assignPassword", auth, assignPassword);
UserBrokerRouter.post("/validate", auth, validate);
UserBrokerRouter.post("/sendCredentials", auth, sendCredentials);
UserBrokerRouter.post("/updatePassword", auth, updatePassword);
UserBrokerRouter.get("/getByEmail/:broker_rut/:email", auth, getByEmail);

export default UserBrokerRouter;
