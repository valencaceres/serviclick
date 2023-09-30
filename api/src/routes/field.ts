import { Router } from "express";

import auth from "../middlewares/auth";
import { getByProductPlanId } from "../controllers/field";

const FieldRouter = Router();

FieldRouter.get(
  "/getByProductPlanId/:productPlan_id",
  auth,
  getByProductPlanId
);

export default FieldRouter;
