import { Router } from "express";

import auth from "../middlewares/auth";
import { create, assignPassword, validate } from "../controllers/user";

const UserRouter = Router();

UserRouter.post("/create", auth, create);
UserRouter.put("/assignPassword", auth, assignPassword);
UserRouter.post("/validate", auth, validate);

export default UserRouter;
