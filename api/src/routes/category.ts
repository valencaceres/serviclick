import { Router } from "express";

import auth from "../middlewares/auth";
import { getAll } from "../controllers/category";

const CategoryRouter = Router();

CategoryRouter.get("/getAll", auth, getAll);

export default CategoryRouter;
