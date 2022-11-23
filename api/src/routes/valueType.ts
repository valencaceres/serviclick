import { Router } from "express";

import auth from "../middlewares/auth";
import { create, updateById, getAll, getById } from "../controllers/valueType";

const ValueTypeRouter = Router();

ValueTypeRouter.post("/create", auth, create);
ValueTypeRouter.put("/updateById", auth, updateById);
ValueTypeRouter.get("/getAll", auth, getAll);
ValueTypeRouter.get("/getById/:id", auth, getById);

export default ValueTypeRouter;
