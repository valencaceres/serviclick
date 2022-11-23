import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  updateById,
  getAll,
  getById,
  getFamilies,
  getByFamilyId,
} from "../controllers/value";

const ValueRouter = Router();

ValueRouter.post("/create", auth, create);
ValueRouter.put("/updateById", auth, updateById);
ValueRouter.get("/getAll", auth, getAll);
ValueRouter.get("/getById/:id", auth, getById);
ValueRouter.get("/getFamilies", auth, getFamilies);
ValueRouter.get("/getByFamilyId/:family_id", auth, getByFamilyId);

export default ValueRouter;
