import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export type ValueTypeT = {
  id: string;
  code: string;
  name: string;
  description: string;
};

type StateT = {
  list: ValueTypeT[];
  valueType: ValueTypeT;
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  valueType: {
    id: "",
    code: "",
    name: "",
    description: "",
  },
  loading: false,
  error: false,
};

export const valueTypeSlice = createSlice({
  name: "valueTypes",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setList: (state: StateT, action: PayloadAction<ValueTypeT[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    set: (state: StateT, action: PayloadAction<ValueTypeT>) => {
      state.valueType = action.payload;
      state.loading = false;
      state.error = false;
    },
    reset: (state: StateT) => {
      state.valueType = initialState.valueType;
      state.loading = false;
      state.error = false;
    },
    resetList: (state: StateT) => {
      state.list = initialState.list;
      state.loading = false;
      state.error = false;
    },
    resetAll: (state: any) => {
      state = initialState;
    },
  },
});

export const {
  setLoading,
  setError,
  setList,
  set,
  reset,
  resetList,
  resetAll,
} = valueTypeSlice.actions;

export default valueTypeSlice.reducer;

export const create = (valueType: ValueTypeT) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resolveData = await apiInstance.post(`/valueType/create`, valueType);
    dispatch(set(resolveData.data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const updateById = (valueType: ValueTypeT) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resolveData = await apiInstance.put(
      `/valueType/updateById`,
      valueType
    );
    dispatch(set(resolveData.data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getAll = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resolveData = await apiInstance.get(`/valueType/getAll`);
    dispatch(setList(resolveData.data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getById = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resolveData = await apiInstance.get(`/valueType/getById/${id}`);
    dispatch(set(resolveData.data));
  } catch (e) {
    dispatch(setError(true));
  }
};
