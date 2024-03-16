import { Router } from "express";

import auth from "../middlewares/auth";
import { sendController } from "../controllers/email";

const UserRouter = Router();

UserRouter.post("/send",auth, sendController);

export default UserRouter;
