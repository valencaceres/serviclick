import { Router } from "express";

import auth from "../middlewares/auth";
import { createUser } from "../controllers/user";

const userRouter = Router();

userRouter.post("/create", auth, createUser);

export default userRouter;
