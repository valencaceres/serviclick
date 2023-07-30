import { Router } from "express";

import { clerkController } from "../controllers/clerk";

const ClerkRouter = Router();

ClerkRouter.post("/", clerkController);

export default ClerkRouter;
