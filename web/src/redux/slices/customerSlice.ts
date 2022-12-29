import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bool } from "joi";

import { apiInstance } from "../../utils/api";

export type CustomerT = {
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
  list: CustomerT[];
  customer: CustomerT;
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  customer: {
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
  error: false,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setCustomerList: (state: StateT, action: PayloadAction<CustomerT[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setCustomer: (state: StateT, action: PayloadAction<CustomerT>) => {
      state.customer = action.payload;
      state.loading = false;
      state.error = false;
    },
    resetCustomer: (state: StateT) => {
      state.customer = initialState.customer;
      state.loading = false;
      state.error = false;
    },
    reset: (state: StateT) => {
      state = initialState;
    },
  },
});

export const {
  setCustomerList,
  setCustomer,
  setLoading,
  setError,
  resetCustomer,
  reset,
} = customerSlice.actions;

export default customerSlice.reducer;

export const getByRut = (rut: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`customer/getByRut/${rut}`);
    dispatch(setCustomer(data));
  } catch (e) {
    dispatch(setError(true));
  }
  return true;
};

export const create = (customer: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`/customer/create`, customer);
    dispatch(setCustomer(data));
  } catch (e) {
    dispatch(setError(true));
  }
};
