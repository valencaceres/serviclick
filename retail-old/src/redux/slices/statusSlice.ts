import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";

export type StatusT = {
  id: string;
  name: string;
};

type StateT = {
  list: StatusT[];
  status: StatusT;
};

const initialState: StateT = {
  list: [],
  status: { id: "", name: "" },
};

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setStatusList: (state: any, action: PayloadAction<any>) => {
      state.list = action.payload;
    },
    setStatus: (state: any, action: PayloadAction<any>) => {
      state.status = action.payload;
    },
    resetStatus: (state: any) => {
      state.status = initialState.status;
    },
  },
});

export const { setStatusList, setStatus, resetStatus } = statusSlice.actions;

export default statusSlice.reducer;

export const getAll = () => (dispatch: any) => {
  axios
    .get(`${config.server}/api/status/getAll`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(setStatusList(response.data));
    })
    .catch((error) => console.log(error));
};
