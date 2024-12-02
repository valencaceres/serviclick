import { Router } from "express";
import auth from "../middlewares/auth";
import * as Payment from "../controllers/payment";

const RPayment = Router();

RPayment.get("/getPaymentById/:id", auth, Payment.getPaymentsBySuscription);
RPayment.get("/getPaymentByDate", auth, Payment.getPaymentByDate);
RPayment.post("/create/:id", auth, Payment.createPayment);
RPayment.post("/duedayBySuscription/:id", auth, Payment.duedayBySuscription);
RPayment.post(
  "/sendLinkBySuscriptionId",
  auth,
  Payment.sendLinkBySuscriptionId
);
RPayment.post("/changeAmount/:id", auth, Payment.changeAmount);

export default RPayment;
