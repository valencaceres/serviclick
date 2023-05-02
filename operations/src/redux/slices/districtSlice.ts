import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export type DistrictT = {
  id: string;
  district_name: string;
};

type StateT = {
  list: DistrictT[];
  district: DistrictT;
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  district: { id: "", district_name: "" },
  loading: false,
  error: false,
};

export const districtSlice = createSlice({
  name: "districts",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setDistrictList: (state: StateT, action: PayloadAction<DistrictT[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setDistrict: (state: StateT, action: PayloadAction<DistrictT>) => {
      state.district = action.payload;
      state.loading = false;
      state.error = false;
    },
    resetDistrict: (state: StateT) => {
      state.district = initialState.district;
      state.loading = false;
      state.error = false;
    },
    reset: (state: StateT) => {
      state = initialState;
    },
  },
});

export const {
  setLoading,
  setError,
  setDistrictList,
  setDistrict,
  resetDistrict,
  reset,
} = districtSlice.actions;

export default districtSlice.reducer;

export const listAll = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/district/listAll`);
    dispatch(setDistrictList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};
