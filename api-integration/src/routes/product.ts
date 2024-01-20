import { Router } from "express";

import auth from "../middlewares/auth";
import { getAll, getById } from "../controllers/product";
import { extractAgentIdMiddleware } from "../middlewares/token";

const productRouter = Router();

productRouter.get("/getAll",auth, extractAgentIdMiddleware, getAll);
productRouter.get("/getById/:id",auth,extractAgentIdMiddleware, getById);

export default productRouter;
