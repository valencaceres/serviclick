import createLogger from "../util/logger";

import * as Document from "../models/document";

const createDocument = async (req: any, res: any) => {
  const { name, family_id } = req.body;

  const documentResponse = await Document.createDocument(family_id, name);

  if (!documentResponse.success) {
    createLogger.error({
      model: "document/createDocument",
      error: documentResponse.error,
    });
    res.status(500).json({ error: "Error creating document" });
    return;
  }

  createLogger.info({
    controller: "document",
    message: "OK",
  });
  res.status(200).json(documentResponse.data);
};

const updateDocument = async (req: any, res: any) => {
  const { id } = req.params;
  const { name, family_id } = req.body;

  const documentResponse = await Document.updateDocument(id, family_id, name);
  if (!documentResponse.success) {
    createLogger.error({
      model: "document/updateDocument",
      error: documentResponse.error,
    });
    res.status(500).json({ error: "Error updating document" });
    return;
  }

  createLogger.info({
    controller: "document",
    message: "OK",
  });
  res.status(200).json(documentResponse.data);
};

const deleteDocument = async (req: any, res: any) => {
  const { id } = req.params;
  const documentResponse = await Document.deleteDocument(id);

  if (!documentResponse.success) {
    createLogger.error({
      model: "document/deleteDocument",
      error: documentResponse.error,
    });
    res.status(500).json({ error: "Error deleting document" });
    return;
  }

  createLogger.info({
    controller: "document",
    message: "OK",
  });
  res.status(200).json(documentResponse.data);
};

const getAllDocuments = async (req: any, res: any) => {
  const documentResponse = await Document.getAllDocuments();

  if (!documentResponse.success) {
    createLogger.error({
      model: "document/listFamilies",
      error: documentResponse.error,
    });
    res.status(500).json({ error: "Error retrieving documents" });
    return;
  }

  createLogger.info({
    controller: "document",
    message: "OK",
  });
  res.status(200).json(documentResponse.data);
};

const getDocument = async (req: any, res: any) => {
  const { id } = req.params;
  const documentResponse = await Document.getDocument(id);

  if (!documentResponse.success) {
    createLogger.error({
      model: "document/getDocument",
      error: documentResponse.error,
    });
    res.status(500).json({ error: "Error retrieving document" });
    return;
  }

  createLogger.info({
    controller: "document",
    message: "OK",
  });
  res.status(200).json(documentResponse.data);
};

const getDocumentsByFamilyId = async (req: any, res: any) => {
  const { family_id } = req.params;
  const documentResponse = await Document.getDocumentsByFamilyId(family_id);

  if (!documentResponse.success) {
    createLogger.error({
      model: "document/getDocumentsByFamilyId",
      error: documentResponse.error,
    });
    res.status(500).json({ error: "Error retrieving documents" });
    return;
  }

  createLogger.info({
    controller: "document/getDocumentsByFamilyId",
    message: "OK",
  });
  res.status(200).json(documentResponse.data);
};

const getFamilies = async (req: any, res: any) => {
  const documentResponse = await Document.getFamilies();

  if (!documentResponse.success) {
    createLogger.error({
      model: "document/getFamilies",
      error: documentResponse.error,
    });
    res.status(500).json({ error: "Error retrieving families" });
    return;
  }

  createLogger.info({
    controller: "document/getFamilies",
    message: "OK",
  });
  res.status(200).json(documentResponse.data);
};

export {
  createDocument,
  updateDocument,
  deleteDocument,
  getDocument,
  getAllDocuments,
  getDocumentsByFamilyId,
  getFamilies,
};
