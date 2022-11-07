import { Router } from "express";

import auth from "../middlewares/auth";
import { listAll } from "../controllers/district";

const DistrictRouter = Router();

DistrictRouter.get("/listAll", auth, listAll);

export default DistrictRouter;
