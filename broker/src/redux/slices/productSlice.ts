import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { config } from "../../utils/config";

import { apiInstance } from "../../utils/api";
import { setLoading } from "./brokerSlice";

export type CoverageT = {
  id: string;
  name: string;
  amount: string;
  maximum: string;
  lack: string;
  events: string;
  isCombined: boolean;
};

type PriceT = {
  customer: number;
  company: number;
};

type PlanT = {
  customer: {
    id: number;
    price: number;
  };
  company: {
    id: number;
    price: number;
  };
};

type FamilyValueT = {
  id: string;
  name: string;
};

type FrequencyT = "M" | "A" | "S";

export type ProductT = {
  id: string;
  family_id: string;
  name: string;
  cost: number;
  isSubject: boolean;
  price: PriceT;
  frequency: FrequencyT;
  term: string;
  beneficiaries: number;
  minInsuredCompanyPrice: number;
  dueDay: number;
  coverages: CoverageT[];
  familyValues: FamilyValueT[];
  plan: PlanT;
  isActive: boolean;
};

type StateT = {
  list: ProductT[];
  product: ProductT;
  isLoading: boolean;
};

export const initialState: StateT = {
  list: [],
  product: {
    id: "",
    family_id: "",
    name: "",
    cost: 0,
    isSubject: false,
    price: { customer: 0, company: 0 },
    plan: { customer: { id: 0, price: 0 }, company: { id: 0, price: 0 } },
    frequency: "M",
    term: "",
    beneficiaries: 0,
    minInsuredCompanyPrice: 0,
    dueDay: 0,
    coverages: [],
    familyValues: [],
    isActive: true,
  },
  isLoading: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductList: (state: StateT, action: PayloadAction<ProductT[]>) => {
      state.list = action.payload;
      state.isLoading = false;
    },
    setProduct: (state: StateT, action: PayloadAction<ProductT>) => {
      state.product = action.payload;
      state.isLoading = false;
    },
    setIsLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetProduct: (state: StateT) => {
      state.product = initialState.product;
    },
  },
});

export const { setProductList, setProduct, resetProduct } =
  productSlice.actions;

export default productSlice.reducer;

export const getProduct = (id: string) => async (dispatch: any) => {
  // axios
  //   .get(`${config.server}/api/product/get/${id}`, {
  //     headers: {
  //       id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
  //     },
  //   })
  //   .then((response) => {
  //     dispatch(setProduct(response.data));
  //   })
  //   .catch((error) => console.log(error));
  dispatch(setLoading(true));

  const { data } = await apiInstance.get(`/product/get/${id}`);

  dispatch(setProduct(data));
};

export const listProducts = () => async (dispatch: any) => {
  // axios
  //   .get(`${config.server}/api/product/list`, {
  //     headers: {
  //       id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
  //     },
  //   })
  //   .then((response) => {
  //     dispatch(setProductList(response.data));
  //   })
  //   .catch((error) => console.log(error));
  dispatch(setLoading(true));

  const { data } = await apiInstance.get(`/product/list`);

  dispatch(setProductList(data));
};

export const getProductsByFamilyId =
  (family_id: string) => async (dispatch: any) => {
    // axios
    //   .get(`${config.server}/api/product/getByFamilyId/${family_id}`, {
    //     headers: {
    //       id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
    //     },
    //   })
    //   .then((response) => {
    //     dispatch(setProductList(response.data));
    //   })
    //   .catch((error) => console.log(error));
    dispatch(setLoading(true));

    const { data } = await apiInstance.get(
      `/product/getByFamilyId/${family_id}`
    );

    dispatch(setProductList(data));
  };
