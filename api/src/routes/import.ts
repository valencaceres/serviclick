import { Router } from "express";

import auth from "../middlewares/auth";
import { getAll, getById_BCI } from "../controllers/import";

const ImportRouter = Router();

ImportRouter.get("/getAll", auth, getAll);
ImportRouter.get("/getById_BCI/:id", auth, getById_BCI);

export default ImportRouter;
