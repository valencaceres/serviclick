import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export interface IField {
  type: string;
  id: string;
  name: string;
  format: string;
}

type StateT = {
  list: IField[];
  field: IField;
  isLoading: boolean;
  isError: boolean;
  error: string;
};

const initialState: StateT = {
  list: [],
  field: {
    type: "",
    id: "",
    name: "",
    format: "",
  },
  isLoading: false,
  isError: false,
  error: "",
};

export const fieldSlice = createSlice({
  name: "field",
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
    setFieldList: (state: any, action: PayloadAction<IField[]>) => {
      state.list = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = "";
    },
    setField: (state: any, action: PayloadAction<IField>) => {
      state.field = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = "";
    },
    resetField: (state: any) => {
      state.field = initialState.field;
    },
  },
});

export const {
  setIsLoading,
  setIsError,
  setError,
  setFieldList,
  setField,
  resetField,
} = fieldSlice.actions;

export default fieldSlice.reducer;

export const getFieldsByLeadId = (lead_id: string) => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await apiInstance.get(`/field/getByLeadId/${lead_id}`);
    dispatch(setFieldList(data));
  } catch (e) {
    dispatch(setError((e as Error).message));
  }
};
