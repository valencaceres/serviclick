import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";

export type DistrictT = {
  id: string;
  name: string;
};

type StateT = {
  list: DistrictT[];
  district: DistrictT;
};

const initialState: StateT = {
  list: [],
  district: { id: "", name: "" },
};

export const districtSlice = createSlice({
  name: "districts",
  initialState,
  reducers: {
    setDistrictList: (state: StateT, action: PayloadAction<DistrictT[]>) => {
      state.list = action.payload;
    },
    setDistrict: (state: StateT, action: PayloadAction<DistrictT>) => {
      state.district = action.payload;
    },
    resetDistrict: (state: StateT) => {
      state.district = initialState.district;
    },
    reset: (state: StateT) => {
      state = initialState;
    },
  },
});

export const { setDistrictList, setDistrict, resetDistrict, reset } =
  districtSlice.actions;

export default districtSlice.reducer;

export const listAll = () => (dispatch: any) => {
  axios
    .get(`${config.server}/api/district/listAll`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(setDistrictList(response.data));
    })
    .catch((error) => console.log(error));
};
