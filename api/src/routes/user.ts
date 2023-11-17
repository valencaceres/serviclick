import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  createClerkUser,
  deleteUserById,
  assignPassword,
  validate,
  getByRut,
  getByEmail,
  getAll,
  getAllClerkUsers,
  getClerkUserById,
  updateClerkUser,
  deleteClerkUser,
  sendCredentials,
  updatePassword,
  getByClerkId,
} from "../controllers/user";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const UserRouter = Router();

UserRouter.post("/create", auth, isAuthenticated, isAdmin, create);
UserRouter.post(
  "/createClerkUser",
  auth,
  isAuthenticated,
  isAdmin,
  createClerkUser
);
UserRouter.patch(
  "/updateClerkUser/:id",
  auth,
  isAuthenticated,
  isAdmin,
  updateClerkUser
);
UserRouter.delete(
  "/deleteClerkUser/:id",
  auth,
  isAuthenticated,
  isAdmin,
  updateClerkUser
);

UserRouter.delete(
  "/deleteUserById/:id",
  auth,
  isAuthenticated,
  isAdmin,
  deleteClerkUser
);
UserRouter.put(
  "/assignPassword",
  auth,
  isAuthenticated,
  isAdmin,
  assignPassword
);
UserRouter.post("/validate", auth, isAuthenticated, isAdmin, validate);
UserRouter.get("/getByRut/:rut", auth, getByRut);
UserRouter.get("/getByEmail/:email", auth, getByEmail);
UserRouter.get("/getAll/", auth, getAll);
UserRouter.get("/getAllClerkUsers", auth, getAllClerkUsers);
UserRouter.get("/getUserByClerkId/:id", auth, getClerkUserById);

UserRouter.post(
  "/sendCredentials",
  auth,
  isAuthenticated,
  isAdmin,
  sendCredentials
);
UserRouter.post(
  "/updatePassword",
  auth,
  isAuthenticated,
  isAdmin,
  updatePassword
);
UserRouter.post("/getByIds", auth, getByClerkId);

export default UserRouter;
