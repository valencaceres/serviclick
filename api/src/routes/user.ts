import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  deleteUserById,
  assignPassword,
  validate,
  getByRut,
  getByEmail,
  getAll,
  sendCredentials,
  updatePassword,
  getByClerkId
} from "../controllers/user";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const UserRouter = Router();

UserRouter.post("/create", auth, isAuthenticated, isAdmin, create);
UserRouter.delete("/deleteUserById/:id", auth, isAuthenticated, isAdmin, deleteUserById);
UserRouter.put("/assignPassword", auth, isAuthenticated, isAdmin, assignPassword);
UserRouter.post("/validate", auth, isAuthenticated, isAdmin, validate);
UserRouter.get("/getByRut/:rut", auth, getByRut);
UserRouter.get("/getByEmail/:email", auth, getByEmail);
UserRouter.get("/getAll/", auth, getAll);
UserRouter.post("/sendCredentials", auth, isAuthenticated, isAdmin, sendCredentials);
UserRouter.post("/updatePassword", auth, isAuthenticated, isAdmin, updatePassword);
UserRouter.post("/getByIds", auth, getByClerkId);

export default UserRouter;
