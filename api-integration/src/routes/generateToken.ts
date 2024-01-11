import { Router } from "express";

import auth from "../middlewares/auth";
import { generate } from "../controllers/token";

const tokenRouter = Router();

tokenRouter.post("/",auth, generate);

export default tokenRouter;
