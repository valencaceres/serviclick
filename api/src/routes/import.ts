import { Router } from "express";

import auth from "../middlewares/auth";
import { getAll } from "../controllers/import";

const ImportRouter = Router();

ImportRouter.get("/getAll", auth, getAll);

export default ImportRouter;
