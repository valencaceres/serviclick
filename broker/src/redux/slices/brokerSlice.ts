import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export type FamilyT = {
  id: string;
  icon: string;
  name: string;
};

export type StateT = {
  list: BrokerT[];
  broker: BrokerT;
  familyList: FamilyT[];
  productList: ProductT[];
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
    logo: "",
    products: [],
    users: [],
  },
  familyList: [],
  productList: [],
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
    setLogo: (state: StateT, action: PayloadAction<string>) => {
      state.broker.logo = action.payload;
    },
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setFamilyList: (state: StateT, action: PayloadAction<FamilyT[]>) => {
      state.familyList = action.payload;
    },
    setProductList: (state: StateT, action: PayloadAction<ProductT[]>) => {
      state.productList = action.payload;
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
  setLogo,
  setFamilyList,
  setProductList,
  resetLogo,
  resetBroker,
  reset,
} = brokerSlice.actions;

export default brokerSlice.reducer;

export const create = (values: BrokerT) => async (dispatch: any) => {
  const { success, data, error } = await post(`broker/create`, values);

  if (!success) {
    console.log(error);
    return false;
  }

  dispatch(setBroker(data));
  dispatch(setLoading(false));
  return true;
};

export const getById = (id: string) => async (dispatch: any) => {
  const { success, data, error } = await get(`broker/getById/${id}`);

  if (!success) {
    console.log(error);
    return false;
  }

  dispatch(setBroker(data));
  dispatch(setLoading(false));
  return true;
};

export const getByRut = (rut: string) => async (dispatch: any) => {
  const { success, data, error } = await get(`broker/getByRut/${rut}`);

  if (!success) {
    console.log(error);
    return false;
  }

  dispatch(setBroker(data));
  dispatch(setLoading(false));
  return true;
};

export const getAll = () => async (dispatch: any) => {
  const { success, data, error } = await get(`broker/getAll`);

  if (!success) {
    console.log(error);
    return false;
  }

  dispatch(setList(data));
  dispatch(setLoading(false));
  return true;
};

export const uploadLogo = (logo: any) => async (dispatch: any) => {
  const { success, data, error } = await post(`broker/uploadLogo`, logo);

  if (!success) {
    console.log(error);
    return false;
  }

  dispatch(setList(data));
  dispatch(setLoading(false));
  return true;
};

export const deleteById = (id: string) => async (dispatch: any) => {
  const { success, data, error } = await erase(`broker/deleteById/${id}`);

  if (!success) {
    console.log(error);
    return false;
  }

  dispatch(setList(data));
  dispatch(setLoading(false));
  return true;
};

export const getFamiliesByBrokerId = (id: string) => async (dispatch: any) => {
  const { success, data, error } = await get(
    `broker/getFamiliesByBrokerId/${id}`
  );

  if (!success) {
    console.log(error);
    return false;
  }

  dispatch(setFamilyList(data));
  dispatch(setLoading(false));
  return true;
};

export const getProductsByBrokerIdAndFamilyId =
  (id: string, family_id: string) => async (dispatch: any) => {
    const { success, data, error } = await get(
      `broker/getProductsByBrokerIdAndFamilyId/${id}/${family_id}`
    );

    if (!success) {
      console.log(error);
      return false;
    }

    dispatch(setProductList(data));
    dispatch(setLoading(false));
    return true;
  };
