import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  getAll,
  getByLeadId,
  deleteByLeadId,
} from "../controllers/fileFormat";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const FileFormatRouter = Router();

FileFormatRouter.post("/create", auth, isAuthenticated, isAdmin, create);
FileFormatRouter.get("/getAll", auth, getAll);
FileFormatRouter.get("/getByLeadId/:lead_id", auth, getByLeadId);
FileFormatRouter.delete("/deleteByLeadId/:lead_id", auth, isAuthenticated, isAdmin, deleteByLeadId);

export default FileFormatRouter;
