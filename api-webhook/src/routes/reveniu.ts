import { Router } from "express";

import { reveniuController } from "../controllers/reveniu";

const ReveniuRouter = Router();

ReveniuRouter.post("/", reveniuController);

export default ReveniuRouter;
