import { Router } from "express";

import auth from "../middlewares/auth";

import {
  getAll,
  getById,
  getByRut,
  upsert,
  deleteById,
  validate,
  updatePassword,
  assignRol,
  removeRol,
} from "../controllers/user";

const userRouter = Router();

userRouter.get("/getAll", auth, getAll);
userRouter.get("/getById/:id", auth, getById);
userRouter.get("/getByRut/:code", auth, getByRut);
userRouter.post("/upsert", auth, upsert);
userRouter.post("/validate", auth, validate);
userRouter.delete("/deleteById:id", auth, deleteById);
userRouter.delete("/removeRol/:id", auth, removeRol);
userRouter.put("/updatePassword", auth, updatePassword);
userRouter.put("/assignRol:id", auth, assignRol);

export default userRouter;
