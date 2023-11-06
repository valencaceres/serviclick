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

export type RetailT = {
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
  list: RetailT[];
  retail: RetailT;
  familyList: FamilyT[];
  productList: ProductT[];
  loading: boolean;
};

const initialState: StateT = {
  list: [],
  retail: {
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

export const retailSlice = createSlice({
  name: "retails",
  initialState,
  reducers: {
    setList: (state: StateT, action: PayloadAction<RetailT[]>) => {
      state.list = action.payload;
    },
    setRetail: (state: StateT, action: PayloadAction<RetailT>) => {
      state.retail = action.payload;
    },
    setLogo: (state: StateT, action: PayloadAction<string>) => {
      state.retail.logo = action.payload;
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
  setLogo,
  setFamilyList,
  setProductList,
  resetLogo,
  resetRetail,
  reset,
} = retailSlice.actions;

export default retailSlice.reducer;

export const create = (values: RetailT) => async (dispatch: any) => {
  const { success, data, error } = await post(`retail/create`, values);

  if (!success) {
    return false;
  }

  dispatch(setRetail(data));
  dispatch(setLoading(false));
  return true;
};

export const getById = (id: string) => async (dispatch: any) => {
  const { success, data, error } = await get(`retail/getById/${id}`);

  if (!success) {
    return false;
  }

  dispatch(setRetail(data));
  dispatch(setLoading(false));
  return true;
};

export const getByRut = (rut: string) => async (dispatch: any) => {
  const { success, data, error } = await get(`retail/getByRut/${rut}`);

  if (!success) {
    return false;
  }

  dispatch(setRetail(data));
  dispatch(setLoading(false));
  return true;
};

export const getAll = () => async (dispatch: any) => {
  const { success, data, error } = await get(`retail/getAll`);

  if (!success) {
    return false;
  }

  dispatch(setList(data));
  dispatch(setLoading(false));
  return true;
};

export const uploadLogo = (logo: any) => async (dispatch: any) => {
  const { success, data, error } = await post(`retail/uploadLogo`, logo);

  if (!success) {
    return false;
  }

  dispatch(setList(data));
  dispatch(setLoading(false));
  return true;
};

export const deleteById = (id: string) => async (dispatch: any) => {
  const { success, data, error } = await erase(`retail/deleteById/${id}`);

  if (!success) {
    return false;
  }

  dispatch(setList(data));
  dispatch(setLoading(false));
  return true;
};

export const getFamiliesByRetailId = (id: string) => async (dispatch: any) => {
  const { success, data, error } = await get(
    `retail/getFamiliesByRetailId/${id}`
  );

  if (!success) {
    return false;
  }

  dispatch(setFamilyList(data));
  dispatch(setLoading(false));
  return true;
};

export const getProductsByRetailIdAndFamilyId =
  (id: string, family_id: string) => async (dispatch: any) => {
    const { success, data, error } = await get(
      `retail/getProductsByRetailIdAndFamilyId/${id}/${family_id}`
    );

    if (!success) {
      return false;
    }

    dispatch(setProductList(data));
    dispatch(setLoading(false));
    return true;
  };
