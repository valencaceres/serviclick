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
} from "../controllers/user";

const UserRouter = Router();

UserRouter.post("/create", auth, create);
UserRouter.delete("/deleteUserById/:id", auth, deleteUserById);
UserRouter.put("/assignPassword", auth, assignPassword);
UserRouter.post("/validate", auth, validate);
UserRouter.get("/getByRut/:rut", auth, getByRut);
UserRouter.get("/getByEmail/:email", auth, getByEmail);
UserRouter.get("/getAll/", auth, getAll);
UserRouter.post("/sendCredentials", auth, sendCredentials);
UserRouter.post("/updatePassword", auth, updatePassword);

export default UserRouter;
