const auth = require("../middlewares/auth");

import { Router } from "express";

import { validate } from "../controllers/auth";

const AuthRouter = Router();

AuthRouter.post("/validate", auth, validate);

export default AuthRouter;
