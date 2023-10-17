import { Router } from "express";

import auth from "../middlewares/auth";

const UserRouter = Router();

/* UserRouter.post("/send", auth, sendController);
 */
export default UserRouter;
