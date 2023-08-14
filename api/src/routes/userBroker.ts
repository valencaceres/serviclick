import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  assignPassword,
  validate,
  getByEmail,
  sendCredentials,
  updatePassword,
} from "../controllers/userBroker";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const UserBrokerRouter = Router();

UserBrokerRouter.post("/create", auth, isAuthenticated, isAdmin, create);
UserBrokerRouter.post("/assignPassword", auth, isAuthenticated, isAdmin, assignPassword);
UserBrokerRouter.post("/validate", auth, isAuthenticated, isAdmin, validate);
UserBrokerRouter.post("/sendCredentials", auth, isAuthenticated, isAdmin, sendCredentials);
UserBrokerRouter.post("/updatePassword", auth, isAuthenticated, isAdmin, updatePassword);
UserBrokerRouter.get("/getByEmail/:broker_rut/:email", auth, getByEmail);

export default UserBrokerRouter;
