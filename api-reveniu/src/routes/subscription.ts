import { Router } from "express";
import auth from "../middlewares/auth";
import * as Subscription from "../controllers/subscription";

const RSubscription = Router();

RSubscription.post("/create", Subscription.create);
RSubscription.get("/getAll", Subscription.getAll);
RSubscription.get("/getById/:id", Subscription.getById);
RSubscription.get("/getByEmail/:email", Subscription.getByEmail);
RSubscription.get("/getInteractionById/:id", Subscription.getInterationById);
RSubscription.post("/reactivateById/:id", Subscription.reactivateByid);
RSubscription.post("/disableById/:id", Subscription.disableById);
RSubscription.post("/disableRenew/:id", Subscription.disableRenewById);

export default RSubscription;
