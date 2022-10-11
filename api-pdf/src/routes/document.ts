import { Router } from "express";

import auth from "../middlewares/auth";
import { createContract, createAnnex } from "../controllers/document";

const DocumentRouter = Router();

DocumentRouter.post("/contract", auth, createContract);
DocumentRouter.post("/annex", auth, createAnnex);

export default DocumentRouter;
