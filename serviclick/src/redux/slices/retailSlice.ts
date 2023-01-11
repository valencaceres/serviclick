import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export type PriceT = {
  customer: number;
  company: number;
};

export type LegalRepresentativeT = {
  rut: string;
  namer: string;
};

export type ProductT = {
  product_id: string;
  campaign: string;
  price: PriceT;
  trialMonths: number;
  currency: string;
};

export type UserT = {
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
  profileCode: string;
};

export type RetailT = {
  id: string;
  rut: string;
  name: string;
  line: string;
  fantasyName: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  logo: string;
  legalRepresentatives: LegalRepresentativeT[];
  products: ProductT[];
  users: UserT[];
};

export type StateT = {
  list: RetailT[];
  retail: RetailT;
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  retail: {
    id: "",
    rut: "",
    name: "",
    line: "",
    fantasyName: "",
    address: "",
    district: "",
    email: "",
    phone: "",
    logo: "",
    legalRepresentatives: [],
    products: [],
    users: [],
  },
  loading: false,
  error: false,
};

export const retailSlice = createSlice({
  name: "retails",
  initialState,
  reducers: {
    setList: (state: StateT, action: PayloadAction<RetailT[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setRetail: (state: StateT, action: PayloadAction<RetailT>) => {
      state.retail = action.payload;
      state.loading = false;
      state.error = false;
    },
    setLogo: (state: StateT, action: PayloadAction<string>) => {
      state.retail.logo = action.payload;
      state.loading = false;
      state.error = false;
    },
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetRetail: (state: StateT) => {
      state.retail = initialState.retail;
    },
    resetLogo: (state: StateT) => {
      state.retail.logo = initialState.retail.logo;
    },
    reset: (state: StateT) => {
      state = initialState;
    },
  },
});

export const {
  setList,
  setRetail,
  setLoading,
  setError,
  setLogo,
  resetLogo,
  resetRetail,
  reset,
} = retailSlice.actions;

export default retailSlice.reducer;

export const create = (values: RetailT) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`retail/create`, values);
    dispatch(setRetail(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getById = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`retail/getById/${id}`);
    dispatch(setRetail(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getByRut = (rut: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`retail/getByRut/${rut}`);
    dispatch(setRetail(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getAll = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`retail/getAll`);
    dispatch(setList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const uploadLogo = (logo: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`retail/uploadLogo`, logo);
    dispatch(setList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const deleteById = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.delete(`retail/deleteById/${id}`);
    dispatch(setList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};
