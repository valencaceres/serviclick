import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export interface IFieldFormat {
  id: string;
  field_id: string;
  field_name: string;
  field_format: string;
}

export interface IFileFormatListItem {
  id: string;
  rut: string;
  companyName: string;
}

export interface IFileFormat {
  lead_id: string;
  fields: IFieldFormat[];
}

type StateT = {
  list: IFileFormatListItem[];
  fileFormat: IFileFormat;
  isLoading: boolean;
  isError: boolean;
  error: string;
};

const initialState: StateT = {
  list: [],
  fileFormat: { lead_id: "", fields: [] },
  isLoading: false,
  isError: false,
  error: "",
};

export const fileFormatSlice = createSlice({
  name: "fileFormat",
  initialState,
  reducers: {
    setIsLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsError: (state: StateT, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
    setError: (state: StateT, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isError = true;
      state.isLoading = false;
    },
    setFileFormatList: (
      state: any,
      action: PayloadAction<IFileFormatListItem[]>
    ) => {
      state.list = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = "";
    },
    setFileFormat: (state: any, action: PayloadAction<IFileFormat>) => {
      state.fileFormat = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = "";
    },
    resetFileFormat: (state: any) => {
      state.fileFormat = initialState.fileFormat;
    },
  },
});

export const {
  setIsLoading,
  setIsError,
  setError,
  setFileFormatList,
  setFileFormat,
  resetFileFormat,
} = fileFormatSlice.actions;

export default fileFormatSlice.reducer;

export const createFileFormat =
  (fileFormat: IFileFormat) => async (dispatch: any) => {
    try {
      dispatch(setIsLoading(true));
      const { data } = await apiInstance.post(`/fileFormat/create`, fileFormat);
      dispatch(getAllFileFormat());
    } catch (e) {
      dispatch(setError((e as Error).message));
    }
  };

export const getFileFormatByLeadId =
  (lead_id: string) => async (dispatch: any) => {
    try {
      dispatch(setIsLoading(true));
      const { data } = await apiInstance.get(
        `/fileFormat/getByLeadId/${lead_id}`
      );
      dispatch(setFileFormat({ lead_id, fields: data }));
    } catch (e) {
      dispatch(setError((e as Error).message));
    }
  };

export const getAllFileFormat = () => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await apiInstance.get(`/fileFormat/getAll`);
    dispatch(setFileFormatList(data));
  } catch (e) {
    dispatch(setError((e as Error).message));
  }
};

export const deleteFileFormatByLeadId =
  (lead_id: string) => async (dispatch: any) => {
    try {
      dispatch(setIsLoading(true));
      const { data } = await apiInstance.delete(
        `/fileFormat/deleteByLeadId/${lead_id}`
      );
      dispatch(getAllFileFormat());
    } catch (e) {
      dispatch(setError((e as Error).message));
    }
  };
