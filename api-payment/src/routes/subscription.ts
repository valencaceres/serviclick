import { Router } from "express";
import * as Subscription from '../controllers/subscription'

import auth from "../middlewares/auth";

const SubscriptionRouter = Router()

SubscriptionRouter.post('/create', auth, Subscription.create)
SubscriptionRouter.get('/getById', auth, Subscription.getById)

export default SubscriptionRouter