import { Router } from "express";
import * as Subscriptions from "../controllers/subscription";

const SubscriptionRouter = Router();

SubscriptionRouter.post("/create", Subscriptions.create);
SubscriptionRouter.get("/getAll", Subscriptions.getAllByPlanId);
SubscriptionRouter.get("/getById/:id", Subscriptions.getById);
SubscriptionRouter.get("/getCustomer", Subscriptions.getCustomer);
SubscriptionRouter.get("/getCustomerById/:id", Subscriptions.getCustomerById);
SubscriptionRouter.get("/getInvoicesById/:id", Subscriptions.getInvoicesById);
SubscriptionRouter.get("/getPaymentStatus", Subscriptions.getPaymentStatus);

export default SubscriptionRouter;
