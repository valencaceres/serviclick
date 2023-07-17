import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

import { IDocument } from "../../interfaces/document";
import { IFamily } from "../../interfaces/family";

type StateT = {
  list: IDocument[];
  document: IDocument;
  families: IFamily[];
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  document: { id: "", family_id: "", name: "" },
  families: [],
  loading: false,
  error: false,
};

export const documentSlice = createSlice({
  name: "families",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setDocumentList: (state: StateT, action: PayloadAction<IDocument[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setDocument: (state: StateT, action: PayloadAction<IDocument>) => {
      state.document = action.payload;
      state.loading = false;
      state.error = false;
    },
    setFamilies: (state: StateT, action: PayloadAction<IFamily[]>) => {
      state.families = action.payload;
      state.loading = false;
      state.error = false;
    },
    resetDocument: (state: StateT) => {
      state.document = initialState.document;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  setLoading,
  setError,
  setDocumentList,
  setDocument,
  setFamilies,
  resetDocument,
} = documentSlice.actions;

export default documentSlice.reducer;

export const createDocument =
  (document: IDocument) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.post(`/document/create`, document);
      dispatch(getAllDocuments());
      dispatch(setDocument(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const updateDocument =
  (document: IDocument) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.put(
        `/document/update/${document.id}`,
        document
      );
      dispatch(getAllDocuments());
      dispatch(setDocument(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const deleteDocument = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.delete(`/document/delete/${id}`);
    dispatch(getAllDocuments());
    dispatch(resetDocument());
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getDocument = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/document/get/${id}`);
    dispatch(setDocument(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getAllDocuments = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/document/getAllDocuments`);
    dispatch(setDocumentList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getDocumentsByFamilyId =
  (family_id: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.get(
        `/document/getDocumentsByFamilyId/${family_id}`
      );
      dispatch(setDocumentList(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const getFamilies = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/document/families`);
    dispatch(setFamilies(data));
  } catch (e) {
    dispatch(setError(true));
  }
};
