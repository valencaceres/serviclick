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
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const DocumentRouter = Router();

DocumentRouter.post("/create", auth, isAuthenticated, isAdmin, createDocument);
DocumentRouter.put("/update/:id", auth, isAuthenticated, isAdmin, updateDocument);
DocumentRouter.delete("/delete/:id", auth, isAuthenticated, isAdmin, deleteDocument);
DocumentRouter.get("/get/:id", auth, getDocument);
DocumentRouter.get("/getAllDocuments", auth, getAllDocuments);
DocumentRouter.get("/families", auth, getFamilies);
DocumentRouter.get("/getDocumentsByFamilyId/:family_id", auth, getDocumentsByFamilyId);

export default DocumentRouter;
