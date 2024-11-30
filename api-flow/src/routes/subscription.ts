import { Router } from "express";
import auth from "../middlewares/auth";
import * as Subscriptions from '../controllers/subscription'

const SubscriptionRouter = Router()

SubscriptionRouter.post('/create', Subscriptions.create)
SubscriptionRouter.get('/getAll', Subscriptions.getAll)
SubscriptionRouter.get('/getById/:id', Subscriptions.getById)
SubscriptionRouter.get('/getCustomer', Subscriptions.getCustomer)

export default SubscriptionRouter