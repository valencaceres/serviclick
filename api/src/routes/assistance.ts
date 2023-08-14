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
  getValuesById,
  getDocumentsById,
  assignValue,
} from "../controllers/assistance";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const AssistanceRouter = Router();

AssistanceRouter.post("/create", auth, isAuthenticated, isAdmin, create);
AssistanceRouter.put("/updateById", auth, isAuthenticated, isAdmin, updateById);
AssistanceRouter.delete("/deleteById/:id", auth, isAuthenticated, isAdmin, deleteById);
AssistanceRouter.get("/getAll", auth, getAll);
AssistanceRouter.get("/getById/:id", auth, getById);
AssistanceRouter.get("/getFamilies", auth, getFamilies);
AssistanceRouter.get("/getByFamilyId/:family_id", auth, getByFamilyId);
AssistanceRouter.get("/getValues/:id", auth, getValues);
AssistanceRouter.get("/getValuesById/:insured_id/:assistance_id/:product_id", auth, getValuesById);
AssistanceRouter.get("/getDocumentsById/:id", auth, getDocumentsById);
AssistanceRouter.post("/assignValue", auth, isAuthenticated, isAdmin, assignValue);

export default AssistanceRouter;
