import { Router } from "express";
import * as Plan from '../controllers/plan'

import auth from "../middlewares/auth";

const PlanRouter = Router()

PlanRouter.post('/upsert', auth, Plan.upsert)
PlanRouter.get('/getAll', auth, Plan.getAll)
PlanRouter.get('/getById', auth, Plan.getById)

export default PlanRouter