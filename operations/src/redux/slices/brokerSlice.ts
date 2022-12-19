import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  profileCode: string;
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
  logo: string;
  products: ProductT[];
  users: UserT[];
};

export type StateT = {
  list: BrokerT[];
  broker: BrokerT;
  loading: boolean;
  error: boolean;
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
    logo: "",
    products: [],
    users: [],
  },
  loading: false,
  error: false,
};

export const brokerSlice = createSlice({
  name: "brokers",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setList: (state: StateT, action: PayloadAction<BrokerT[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setBroker: (state: StateT, action: PayloadAction<BrokerT>) => {
      state.broker = action.payload;
      state.loading = false;
      state.error = false;
    },
    setLogo: (state: StateT, action: PayloadAction<string>) => {
      state.broker.logo = action.payload;
      state.loading = false;
      state.error = false;
    },
    resetBroker: (state: StateT) => {
      state.broker = initialState.broker;
      state.loading = false;
      state.error = false;
    },
    resetLogo: (state: StateT) => {
      state.broker.logo = initialState.broker.logo;
      state.loading = false;
      state.error = false;
    },
    reset: (state: StateT) => {
      state = initialState;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  setLoading,
  setError,
  setList,
  setBroker,
  setLogo,
  resetLogo,
  resetBroker,
  reset,
} = brokerSlice.actions;

export default brokerSlice.reducer;

export const create = (values: BrokerT) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`broker/create`, values);
    dispatch(setBroker(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getById = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`broker/getById/${id}`);
    dispatch(setBroker(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getByRut = (rut: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`broker/getByRut/${rut}`);
    dispatch(setBroker(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getAll = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`broker/getAll`);
    dispatch(setList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const uploadLogo = (logo: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`broker/uploadLogo`, logo);
    dispatch(setList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const deleteById = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.delete(`broker/deleteById/${id}`);
    dispatch(setList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};
