import { Router } from "express";

import auth from "../middlewares/auth";
import { getAll } from "../controllers/relationship";

const RelationshipRouter = Router();

RelationshipRouter.get("/getAll", auth, getAll);

export default RelationshipRouter;
