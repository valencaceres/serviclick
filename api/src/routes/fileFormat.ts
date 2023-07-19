import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  getAll,
  getByLeadId,
  deleteByLeadId,
} from "../controllers/fileFormat";

const FileFormatRouter = Router();

FileFormatRouter.post("/create", auth, create);
FileFormatRouter.get("/getAll", auth, getAll);
FileFormatRouter.get("/getByLeadId/:lead_id", auth, getByLeadId);
FileFormatRouter.delete("/deleteByLeadId/:lead_id", auth, deleteByLeadId);

export default FileFormatRouter;
