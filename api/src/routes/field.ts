import { Router } from "express";

import auth from "../middlewares/auth";
import { getByLeadId } from "../controllers/field";

const FieldRouter = Router();

FieldRouter.get("/getByLeadId/:lead_id", auth, getByLeadId);

export default FieldRouter;
