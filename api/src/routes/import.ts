import { Router } from "express";

import multer from "multer";
import auth from "../middlewares/auth";
import { uploadFile_BCI, getAll, getById_BCI } from "../controllers/import";

const upload = multer();

const ImportRouter = Router();

ImportRouter.post("/uploadFile", auth, upload.single("file"), uploadFile_BCI);
ImportRouter.get("/getAll", auth, getAll);
ImportRouter.get("/getById_BCI/:id", auth, getById_BCI);

export default ImportRouter;
