import { Router } from "express";

import { subscriptionActivated } from "../controllers/webhook";

const WebHookRouter = Router();

WebHookRouter.post("/subscriptionActivated", subscriptionActivated);

export default WebHookRouter;
