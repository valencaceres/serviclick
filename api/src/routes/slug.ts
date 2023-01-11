import { Router } from "express";

import auth from "../middlewares/auth";
import * as Slug from "../controllers/slug";

const SlugRouter = Router();

SlugRouter.get("/getByCode/:code", auth, Slug.getByCode);

export default SlugRouter;
