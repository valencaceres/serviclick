import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  updateById,
  deleteById,
  getAll,
  getById,
  getFamilies,
  getByFamilyId,
  getValues,
} from "../controllers/assistance";

const AssistanceRouter = Router();

AssistanceRouter.post("/create", auth, create);
AssistanceRouter.put("/updateById", auth, updateById);
AssistanceRouter.delete("/deleteById/:id", auth, deleteById);
AssistanceRouter.get("/getAll", auth, getAll);
AssistanceRouter.get("/getById/:id", auth, getById);
AssistanceRouter.get("/getFamilies", auth, getFamilies);
AssistanceRouter.get("/getByFamilyId/:family_id", auth, getByFamilyId);
AssistanceRouter.get("/getValues/:id", auth, getValues);

export default AssistanceRouter;
