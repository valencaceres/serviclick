import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export type StatusT = {
  id: string;
  name: string;
};

type StateT = {
  list: StatusT[];
  status: StatusT;
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  status: { id: "", name: "" },
  loading: false,
  error: false,
};

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setStatusList: (state: any, action: PayloadAction<any>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setStatus: (state: any, action: PayloadAction<any>) => {
      state.status = action.payload;
      state.loading = false;
      state.error = false;
    },
    resetStatus: (state: any) => {
      state.status = initialState.status;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { setLoading, setError, setStatusList, setStatus, resetStatus } =
  statusSlice.actions;

export default statusSlice.reducer;

export const getAll = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/api/status/getAll`);
    dispatch(setStatusList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};
