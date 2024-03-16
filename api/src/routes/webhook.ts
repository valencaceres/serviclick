import { Router } from "express";

import { /* subscriptionActivated */ generatePDF, reveniuWebHook, process } from "../controllers/webhook";
import auth from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";
const WebHookRouter = Router();

/* WebHookRouter.post("/subscriptionActivated", subscriptionActivated);
 */WebHookRouter.post("/generatePDF", generatePDF);
WebHookRouter.post("/reveniuWebHook", reveniuWebHook);
WebHookRouter.post("/process", auth, isAdmin,  process)
export default WebHookRouter;
