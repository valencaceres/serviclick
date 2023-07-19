import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

interface ILead {
  lead_id: string;
  subscription_id: string;
  product_id: string;
  name: string;
}

interface ICompany {
  id: string;
  rut: string;
  companyname: string;
  legalRepresentative: string;
  line: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  leads: ILead[];
}

type StateT = {
  company: ICompany;
  isLoading: boolean;
  isError: boolean;
  error: string;
};

const initialState: StateT = {
  company: {
    id: "",
    rut: "",
    companyname: "",
    legalRepresentative: "",
    line: "",
    address: "",
    district: "",
    email: "",
    phone: "",
    leads: [],
  },
  isLoading: false,
  isError: false,
  error: "",
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setIsLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsError: (state: StateT, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
      state.isError = false;
    },
    setError: (state: StateT, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isError = true;
      state.isLoading = false;
    },
    setCompany: (state: StateT, action: PayloadAction<ICompany>) => {
      state.company = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = "";
    },
    resetCompany: (state: StateT) => {
      state.company = initialState.company;
    },
    resetCompanyAll: (state: StateT) => {
      state = initialState;
    },
  },
});

export const {
  setIsLoading,
  setIsError,
  setError,
  setCompany,
  resetCompany,
  resetCompanyAll,
} = companySlice.actions;

export default companySlice.reducer;

export const getCompanyLeadsByRut = (rut: string) => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await apiInstance.get(`/company/getLeadsByRut/${rut}`);
    dispatch(setCompany(data));
  } catch (e) {
    dispatch(setError((e as Error).message));
  }
};
