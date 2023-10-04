import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  getAll,
  getByProductPlanId,
  deleteByProductPlanId,
} from "../controllers/fileFormat";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const FileFormatRouter = Router();

FileFormatRouter.post("/create", auth, isAuthenticated, isAdmin, create);
FileFormatRouter.get("/getAll", auth, getAll);
FileFormatRouter.get(
  "/getByProductPlanId/:productPlan_id",
  auth,
  getByProductPlanId
);
FileFormatRouter.delete(
  "/deleteByProductPlanId/:productPlan_id",
  auth,
  isAuthenticated,
  isAdmin,
  deleteByProductPlanId
);

export default FileFormatRouter;
