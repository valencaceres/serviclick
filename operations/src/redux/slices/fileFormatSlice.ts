import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export interface IFileFormat {
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

type StateT = {
  list: IFileFormatListItem[];
  fileFormat: { fields: IFileFormat[] };
  isLoading: boolean;
  isError: boolean;
  error: string;
};

const initialState: StateT = {
  list: [],
  fileFormat: { fields: [] },
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
  (company_id: string, field_id: string, number: number) =>
  async (dispatch: any) => {
    try {
      dispatch(setIsLoading(true));
      const { data } = await apiInstance.post(`/fileFormat/create`, {
        company_id,
        field_id,
        number,
      });
      dispatch(getAllFileFormat());
    } catch (e) {
      dispatch(setError((e as Error).message));
    }
  };

export const getFileFormatByCompanyId =
  (company_id: string) => async (dispatch: any) => {
    try {
      dispatch(setIsLoading(true));
      const { data } = await apiInstance.get(
        `/fileFormat/getByCompanyId/${company_id}`
      );
      dispatch(setFileFormat(data));
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

export const deleteFileFormatByCompanyId =
  (company_id: string) => async (dispatch: any) => {
    try {
      dispatch(setIsLoading(true));
      const { data } = await apiInstance.delete(
        `/fileFormat/deleteByCompanyId/${company_id}`
      );
      dispatch(getAllFileFormat());
    } catch (e) {
      dispatch(setError((e as Error).message));
    }
  };
