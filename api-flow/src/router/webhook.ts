import { Router } from "express";

import { flowWebhook } from "../controllers/webhook";

const WebhookRouter = Router()

WebhookRouter.post('/', flowWebhook)

export default WebhookRouter