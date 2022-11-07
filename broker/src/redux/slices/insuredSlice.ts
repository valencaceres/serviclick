import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { get } from "../../utils/api";

export type InsuredT = {
  id: string;
  rut: string;
  birthDate: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  address: string;
  district: string;
  email: string;
  phone: string;
};

type StateT = {
  list: InsuredT[];
  insured: InsuredT;
  loading: boolean;
};

const initialState: StateT = {
  list: [],
  insured: {
    id: "",
    rut: "",
    birthDate: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    address: "",
    district: "",
    email: "",
    phone: "",
  },
  loading: false,
};

export const insuredSlice = createSlice({
  name: "insured",
  initialState,
  reducers: {
    setInsuredList: (state: StateT, action: PayloadAction<InsuredT[]>) => {
      state.list = action.payload;
    },
    setInsured: (state: StateT, action: PayloadAction<InsuredT>) => {
      state.insured = action.payload;
    },
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetInsured: (state: StateT) => {
      state.insured = initialState.insured;
    },
    reset: (state: StateT) => {
      state = initialState;
    },
  },
});

export const { setInsuredList, setInsured, setLoading, resetInsured, reset } =
  insuredSlice.actions;

export default insuredSlice.reducer;

export const getByRut = (rut: string) => async (dispatch: any) => {
  const { success, data, error } = await get(`insured/getByRut/${rut}`);

  if (!success) {
    console.log(error);
    return false;
  }

  dispatch(setInsured(data));
  dispatch(setLoading(false));
  return true;
};
