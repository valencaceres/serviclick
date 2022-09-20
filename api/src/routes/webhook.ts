import { Router } from "express";

import { feedbackController } from "../controllers/webhook";

const WebHookRouter = Router();

WebHookRouter.post("/", feedbackController);

export default WebHookRouter;
