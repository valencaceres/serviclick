import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { get } from "../../utils/api";

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
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomerList: (state: StateT, action: PayloadAction<CustomerT[]>) => {
      state.list = action.payload;
    },
    setCustomer: (state: StateT, action: PayloadAction<CustomerT>) => {
      state.customer = action.payload;
    },
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetCustomer: (state: StateT) => {
      state.customer = initialState.customer;
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
  resetCustomer,
  reset,
} = customerSlice.actions;

export default customerSlice.reducer;

export const getByRut = (rut: string) => async (dispatch: any) => {
  const { success, data, error } = await get(`customer/getByRut/${rut}`);

  if (!success) {
    console.log(error);
    return false;
  }

  dispatch(setCustomer(data));
  dispatch(setLoading(false));
  return true;
};
