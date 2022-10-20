import { Router } from "express";

import auth from "../middlewares/auth";
import { createContract, createAnnex, test } from "../controllers/document";

const DocumentRouter = Router();

DocumentRouter.post("/contract", auth, createContract);
DocumentRouter.post("/annex", auth, createAnnex);
DocumentRouter.post("/test", auth, test);

export default DocumentRouter;
