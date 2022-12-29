import { Router } from "express";

import auth from "../middlewares/auth";
import {
  createDocument,
  updateDocument,
  deleteDocument,
  getDocument,
  getAllDocuments,
  getDocumentsByFamilyId,
  getFamilies,
} from "../controllers/document";

const DocumentRouter = Router();

DocumentRouter.post("/create", auth, createDocument);
DocumentRouter.put("/update/:id", auth, updateDocument);
DocumentRouter.delete("/delete/:id", auth, deleteDocument);
DocumentRouter.get("/get/:id", auth, getDocument);
DocumentRouter.get("/getAllDocuments", auth, getAllDocuments);
DocumentRouter.get("/families", auth, getFamilies);
DocumentRouter.get(
  "/getDocumentsByFamilyId/:family_id",
  auth,
  getDocumentsByFamilyId
);

export default DocumentRouter;
