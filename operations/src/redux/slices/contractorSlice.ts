import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export type ContractorT = {
  type: string;
  id: string;
  rut: string;
  name: string;
  companyName: string;
  legalRepresentative: string;
  line: string;
  paternalLastName: string;
  maternalLastName: string;
  birthDate: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  quantity: number;
};

export type ContractorItemT = {
  type: string;
  id: string;
  rut: string;
  name: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  quantity: number;
};

type StateT = {
  list: ContractorItemT[];
  contractor: ContractorT;
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  contractor: {
    type: "",
    id: "",
    rut: "",
    name: "",
    companyName: "",
    legalRepresentative: "",
    line: "",
    paternalLastName: "",
    maternalLastName: "",
    birthDate: "",
    address: "",
    district: "",
    email: "",
    phone: "",
    quantity: 0,
  },
  loading: false,
  error: false,
};

export const contractorSlice = createSlice({
  name: "contractors",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setContractorList: (state: any, action: PayloadAction<any>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setContractor: (state: any, action: PayloadAction<any>) => {
      state.contractor = action.payload;
      state.loading = false;
      state.error = false;
    },
    resetContractor: (state: any) => {
      state.contractor = initialState.contractor;
      state.loading = false;
      state.error = false;
    },
    resetContractorAll: (state: any) => {
      state = initialState;
    },
  },
});

export const {
  setLoading,
  setError,
  setContractorList,
  setContractor,
  resetContractor,
  resetContractorAll,
} = contractorSlice.actions;

export default contractorSlice.reducer;

export const create = (contractor: ContractorT) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`/contractor/create`, contractor);
    dispatch(setContractor(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getAll =
  (contractorType: string, nameLike: string, active: boolean) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.post(`/contractor/getAll`, {
        contractorType,
        nameLike,
        active,
      });
      dispatch(setContractorList(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const getById = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/contractor/getById/${id}`);
    dispatch(setContractor(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getByRut =
  (rut: string, type: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.get(
        `/contractor/getByRut/${rut}/${type}`
      );
      dispatch(setContractor(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };
