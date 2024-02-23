import { Router } from "express";

import { subscriptionActivated, generatePDF, reveniuWebHook } from "../controllers/webhook";

const WebHookRouter = Router();

WebHookRouter.post("/subscriptionActivated", subscriptionActivated);
WebHookRouter.post("/generatePDF", generatePDF);
WebHookRouter.post("/reveniuWebHook", reveniuWebHook);

export default WebHookRouter;
