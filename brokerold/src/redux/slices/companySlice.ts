import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { get } from "../../utils/api";

export type CompanyT = {
  id: string;
  rut: string;
  companyName: string;
  legalRepresentative: string;
  line: string;
  address: string;
  district: string;
  email: string;
  phone: string;
};

type StateT = {
  list: CompanyT[];
  company: CompanyT;
  loading: boolean;
};

const initialState: StateT = {
  list: [],
  company: {
    id: "",
    rut: "",
    companyName: "",
    legalRepresentative: "",
    line: "",
    address: "",
    district: "",
    email: "",
    phone: "",
  },
  loading: false,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanyList: (state: StateT, action: PayloadAction<CompanyT[]>) => {
      state.list = action.payload;
    },
    setCompany: (state: StateT, action: PayloadAction<CompanyT>) => {
      state.company = action.payload;
    },
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetCompany: (state: StateT) => {
      state.company = initialState.company;
    },
    reset: (state: StateT) => {
      state = initialState;
    },
  },
});

export const { setCompanyList, setCompany, setLoading, resetCompany, reset } =
  companySlice.actions;

export default companySlice.reducer;

export const getByRut = (rut: string) => async (dispatch: any) => {
  const { success, data, error } = await get(`company/getByRut/${rut}`);

  if (!success) {
    console.log(error);
    return false;
  }

  dispatch(setCompany(data));
  dispatch(setLoading(false));
  return true;
};
