import { Router } from "express";

import {
  getAll,
  getById,
  getByRut,
  getByEmail,
  upsert,
  deleteById,
  validate,
  updatePassword,
  assignRol,
  removeRol,
  getUserRolAgent
} from "../controllers/user";

const userRouter = Router();

userRouter.get("/getAll", getAll);
userRouter.get("/getById/:id", getById);
userRouter.get("/getByRut/:rut", getByRut);
userRouter.get("/getByEmail/:email", getByEmail);
userRouter.post("/upsert", upsert);
userRouter.post("/validate", validate);
userRouter.delete("/deleteById:id", deleteById);
userRouter.delete("/removeRol/:id", removeRol);
userRouter.put("/updatePassword", updatePassword);
userRouter.put("/assignRol/:id", assignRol);
userRouter.get("/getUserRolAgent/:id", getUserRolAgent);
export default userRouter;
