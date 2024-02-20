import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { post, get, erase } from "../../utils/api";

export type PriceT = {
  base: number;
  customer: number;
  company: number;
  yearly: number;
};

export type DiscountT = {
  type: string;
  percent: number;
  cicles: number;
};

export type ProductT = {
  product_id: string;
  name: string;
  price: PriceT;
  commisionTypeCode: string;
  value: number;
  currency: string;
  discount: DiscountT;
  pdfbase64: any;
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
  fantasyName: string;
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
};

const initialState: StateT = {
  list: [],
  broker: {
    id: "",
    rut: "",
    name: "",
    legalRepresentative: "",
    line: "",
    fantasyName: "",
    address: "",
    district: "",
    email: "",
    phone: "",
    logo: "",
    products: [],
    users: [],
  },
  loading: false,
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
    setProducts: (state: StateT, action: PayloadAction<ProductT[]>) => {
      state.broker.products = action.payload;
    },
    setLogo: (state: StateT, action: PayloadAction<string>) => {
      state.broker.logo = action.payload;
    },
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetBroker: (state: StateT) => {
      state.broker = initialState.broker;
    },
    resetLogo: (state: StateT) => {
      state.broker.logo = initialState.broker.logo;
    },
    reset: (state: StateT) => {
      state = initialState;
    },
  },
});

export const {
  setList,
  setBroker,
  setLoading,
  setProducts,
  setLogo,
  resetLogo,
  resetBroker,
  reset,
} = brokerSlice.actions;

export default brokerSlice.reducer;

export const create = (values: BrokerT) => async (dispatch: any) => {
  const { success, data, error } = await post(`broker/create`, values);

  if (!success) {
    return false;
  }

  dispatch(setBroker(data));
  dispatch(setLoading(false));
  return true;
};

export const getById = (id: string) => async (dispatch: any) => {
  const { success, data, error } = await get(`broker/getById/${id}`);
  if (!success) {
    return false;
  }

  dispatch(setBroker(data));
  dispatch(setLoading(false));
  return true;
};

export const getByRut = (rut: string) => async (dispatch: any) => {
  const { success, data, error } = await get(`broker/getByRut/${rut}`);

  if (!success) {
    return false;
  }

  dispatch(setBroker(data));
  dispatch(setLoading(false));
  return true;
};

export const getAll = () => async (dispatch: any) => {
  const { success, data, error } = await get(`broker/getAll`);

  if (!success) {
    return false;
  }

  dispatch(setList(data));
  dispatch(setLoading(false));
  return true;
};

export const uploadLogo = (logo: any) => async (dispatch: any) => {
  const { success, data, error } = await post(`broker/uploadLogo`, logo);

  if (!success) {
    return false;
  }

  dispatch(setList(data));
  dispatch(setLoading(false));
  return true;
};

export const deleteById = (id: string) => async (dispatch: any) => {
  const { success, data, error } = await erase(`broker/deleteById/${id}`);

  if (!success) {
    return false;
  }

  dispatch(setLoading(false));
  return true;
};

export const addProduct =
  (id: string, product: ProductT) => async (dispatch: any) => {
    const { success, data, error } = await post(`broker/addProduct`, {
      broker_id: id,
      ...product,
    });

    if (!success) {
      return false;
    }

    dispatch(setProducts(data));
    dispatch(setLoading(false));
    return true;
  };

export const removeProduct =
  (id: string, product_id: string) => async (dispatch: any) => {
    const { success, data, error } = await post(`broker/removeProduct`, {
      broker_id: id,
      product_id,
    });

    if (!success) {
      return false;
    }

    dispatch(setProducts(data));
    dispatch(setLoading(false));
    return true;
  };
