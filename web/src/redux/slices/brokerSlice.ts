import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { apiInstance } from "../../utils/api";

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
  loading: boolean;
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
  loading: false,
};

export const brokerSlice = createSlice({
  name: "brokers",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setList: (state: StateT, action: PayloadAction<BrokerT[]>) => {
      state.list = action.payload;
      state.loading = false;
    },
    setBroker: (state: StateT, action: PayloadAction<BrokerT>) => {
      state.broker = action.payload;
      state.loading = false;
    },
    resetBroker: (state: StateT) => {
      state.broker = initialState.broker;
    },
    reset: (state: StateT) => {
      state = initialState;
    },
  },
});

export const { setLoading, setList, setBroker, resetBroker, reset } =
  brokerSlice.actions;

export default brokerSlice.reducer;

export const create = (values: BrokerT) => async (dispatch: any) => {
  dispatch(setLoading(true));
  const { data } = await apiInstance.post(`broker/create`, values);
  dispatch(setBroker(data));
  return true;
};

export const getById = (id: string) => async (dispatch: any) => {
  dispatch(setLoading(true));
  const { data } = await apiInstance.get(`broker/getById/${id}`);
  dispatch(setBroker(data));
  return true;
};

export const getAll = (id: string) => async (dispatch: any) => {
  dispatch(setLoading(true));
  const { data } = await apiInstance.get(`broker/getAll`);
  dispatch(setList(data));
  return true;
};

export const deleteById = (id: string) => async (dispatch: any) => {
  dispatch(setLoading(true));
  const { data } = await apiInstance.delete(`broker/deleteById/${id}`);
  dispatch(setList(data));
  return true;
};
