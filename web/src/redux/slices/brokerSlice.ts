import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";
import { post, get, erase } from "../../utils/api";

export type PriceT = {
  customer: number;
  company: number;
};

export type ProductT = {
  product_id: string;
  price: PriceT;
  commisionTypeCode: string;
  value: number;
  currency: string;
};

export type UserT = {
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
};

export type BrokerT = {
  id: string;
  rut: string;
  name: string;
  legalRepresentative: string;
  line: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  products: ProductT[];
  users: UserT[];
};

export type StateT = {
  list: BrokerT[];
  broker: BrokerT;
};

const initialState: StateT = {
  list: [],
  broker: {
    id: "",
    rut: "",
    name: "",
    legalRepresentative: "",
    line: "",
    address: "",
    district: "",
    email: "",
    phone: "",
    products: [],
    users: [],
  },
};

export const brokerSlice = createSlice({
  name: "brokers",
  initialState,
  reducers: {
    setList: (state: StateT, action: PayloadAction<BrokerT[]>) => {
      state.list = action.payload;
    },
    setBroker: (state: StateT, action: PayloadAction<BrokerT>) => {
      state.broker = action.payload;
    },
    resetBroker: (state: StateT) => {
      state.broker = initialState.broker;
    },
    reset: (state: StateT) => {
      state = initialState;
    },
  },
});

export const { setList, setBroker, resetBroker, reset } = brokerSlice.actions;

export default brokerSlice.reducer;

export const create = (values: BrokerT) => async (dispatch: any) => {
  const { success, data, error } = await post(`broker/create`, values);

  if (!success) {
    console.log(error);
    return false;
  }

  dispatch(setBroker(data));
  return true;
};

export const getById = (id: string) => async (dispatch: any) => {
  const { success, data, error } = await get(`broker/getById/${id}`);

  if (!success) {
    console.log(error);
    return false;
  }

  dispatch(setBroker(data));
  return true;
};

export const getAll = (id: string) => async (dispatch: any) => {
  const { success, data, error } = await get(`broker/getAll`);

  if (!success) {
    console.log(error);
    return false;
  }

  dispatch(setList(data));
  return true;
};

export const deleteById = (id: string) => async (dispatch: any) => {
  const { success, data, error } = await erase(`broker/deleteById/${id}`);

  if (!success) {
    console.log(error);
    return false;
  }

  dispatch(setList(data));
  return true;
};
