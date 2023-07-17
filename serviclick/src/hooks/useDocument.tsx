import * as DocumentSlice from "../redux/slices/documentSlice";

import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { document } from "../interfaces";

const useDocument = () => {
  const dispatch = useAppDispatch();

  const {
    families,
    document,
    list: documentList,
    loading: documentLoading,
    error: documentError,
  } = useAppSelector((state) => state.documentSlice);

  const createDocument = (document: document.IDocument) => {
    dispatch(DocumentSlice.createDocument(document));
  };

  const updateDocument = (document: document.IDocument) => {
    dispatch(DocumentSlice.updateDocument(document));
  };

  const deleteDocumentById = (id: string) => {
    dispatch(DocumentSlice.deleteDocument(id));
  };

  const getDocumentById = (id: string) => {
    dispatch(DocumentSlice.getDocument(id));
  };

  const getAllDocuments = () => {
    dispatch(DocumentSlice.getAllDocuments());
  };

  const getDocumentsByFamilyId = (family_id: string) => {
    dispatch(
      family_id !== ""
        ? DocumentSlice.getDocumentsByFamilyId(family_id)
        : DocumentSlice.getAllDocuments()
    );
  };

  const getFamilies = () => {
    dispatch(DocumentSlice.getFamilies());
  };

  const setDocumentList = (specialties: document.IDocument[]) => {
    dispatch(DocumentSlice.setDocumentList(specialties));
  };

  const setDocument = (document: document.IDocument) => {
    dispatch(DocumentSlice.setDocument(document));
  };

  const resetDocument = () => {
    dispatch(DocumentSlice.resetDocument());
  };

  return {
    createDocument,
    updateDocument,
    deleteDocumentById,
    getDocumentById,
    getAllDocuments,
    getDocumentsByFamilyId,
    getFamilies,
    setDocumentList,
    setDocument,
    resetDocument,
    families,
    document,
    documentList,
    documentLoading,
    documentError,
  };
};

export default useDocument;
