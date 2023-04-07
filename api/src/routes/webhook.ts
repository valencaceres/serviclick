import { Router } from "express";

import { subscriptionActivated, generatePDF } from "../controllers/webhook";

const WebHookRouter = Router();

WebHookRouter.post("/subscriptionActivated", subscriptionActivated);
WebHookRouter.post("/generatePDF", generatePDF);

export default WebHookRouter;
