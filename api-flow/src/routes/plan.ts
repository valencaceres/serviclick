import { Router } from "express";
import * as Plans from '../controllers/plan'
import auth from '../middlewares/auth'

const PlanRouter = Router()

PlanRouter.post('/upsert', auth, Plans.upsert)
PlanRouter.get('/getAll',auth, Plans.getAll)
PlanRouter.get('/getById', auth, Plans.getById)

export default PlanRouter