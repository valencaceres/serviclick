import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  getAll,
  getByCompanyId,
  deleteByCompanyId,
} from "../controllers/fileFormat";

const FileFormatRouter = Router();

FileFormatRouter.post("/create", auth, create);
FileFormatRouter.get("/getAll", auth, getAll);
FileFormatRouter.get("/getByCompanyId/:company_id", auth, getByCompanyId);
FileFormatRouter.delete(
  "/deleteByCompanyId/:company_id",
  auth,
  deleteByCompanyId
);

export default FileFormatRouter;
