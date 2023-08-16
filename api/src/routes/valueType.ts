import { Router } from "express";

import auth from "../middlewares/auth";
import { create, updateById, getAll, getById } from "../controllers/valueType";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const ValueTypeRouter = Router();

ValueTypeRouter.post("/create", auth, isAuthenticated, isAdmin, create);
ValueTypeRouter.put("/updateById", auth, isAuthenticated, isAdmin, updateById);
ValueTypeRouter.get("/getAll", auth, getAll);
ValueTypeRouter.get("/getById/:id", auth, getById);

export default ValueTypeRouter;
