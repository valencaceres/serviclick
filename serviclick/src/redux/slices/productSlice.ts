import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export type CoverageT = {
  id: string;
  name: string;
  amount: string;
  maximum: string;
  lack: string;
  events: string;
  isCombined: boolean;
};

export type PriceT = {
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

export type FamilyValueT = {
  id: string;
  name: string;
};

export type ProductT = {
  id: string;
  family_id: string;
  name: string;
  cost: number;
  isSubject: boolean;
  price: PriceT;
  frequency: "M" | "A" | "S";
  term: string;
  beneficiaries: number;
  coverages: CoverageT[];
  familyValues: FamilyValueT[];
  currency: string;
  minInsuredCompanyPrice: number;
  dueDay: number;
  plan: PlanT;
  isActive: boolean;
};

type StateT = {
  list: ProductT[];
  product: ProductT;
  loading: boolean;
};

export const initialState: StateT = {
  list: [],
  product: {
    id: "",
    family_id: "",
    name: "",
    cost: 0,
    isSubject: true,
    price: { customer: 0, company: 0 },
    frequency: "M",
    term: "",
    beneficiaries: 0,
    coverages: [],
    familyValues: [],
    currency: "",
    minInsuredCompanyPrice: 0,
    dueDay: 0,
    plan: { customer: { id: 0, price: 0 }, company: { id: 0, price: 0 } },
    isActive: true,
  },
  loading: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProductList: (state: StateT, action: PayloadAction<any>) => {
      state.list = action.payload;
      state.loading = false;
    },
    setProduct: (state: StateT, action: PayloadAction<any>) => {
      state.product = action.payload;
      state.loading = false;
    },
    resetProduct: (state: StateT) => {
      state.product = initialState.product;
    },
    resetProductList: (state: StateT) => {
      state.list = initialState.list;
    },
  },
});

export const {
  setLoading,
  setProductList,
  setProduct,
  resetProduct,
  resetProductList,
} = productSlice.actions;

export default productSlice.reducer;

export const createProduct =
  (
    family_id: string,
    name: string,
    cost: number,
    isSubject: boolean,
    frequency: string,
    term: string,
    beneficiaries: number,
    minInsuredCompanyPrice: number,
    dueDay: number,
    coverages: CoverageT[],
    familyValues: FamilyValueT[],
    currency: string
  ) =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`/product/create`, {
      family_id,
      name,
      cost,
      isSubject,
      frequency,
      term,
      beneficiaries,
      minInsuredCompanyPrice,
      dueDay,
      coverages,
      familyValues,
      currency,
    });
    dispatch(setProduct(data));
  };

export const assignProductPrices =
  (id: string, agent_id: string, customerprice: number, companyprice: number) =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`/product/assignPrices`, {
      id,
      agent_id,
      customerprice,
      companyprice,
    });
    dispatch(setProduct(data));
  };

export const updateProduct =
  (
    id: string,
    family_id: string,
    name: string,
    cost: number,
    isSubject: boolean,
    frequency: string,
    term: string,
    beneficiaries: number,
    coverages: CoverageT[],
    minInsuredCompanyPrice: number,
    dueDay: number,
    familyValues: FamilyValueT[],
    currency: string
  ) =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    const { data } = await apiInstance.put(`/product/update/${id}`, {
      family_id,
      name,
      cost,
      isSubject,
      frequency,
      term,
      beneficiaries,
      coverages,
      minInsuredCompanyPrice,
      dueDay,
      familyValues,
      currency,
    });
    dispatch(setProduct(data));
  };

export const deleteProduct = (id: string) => async (dispatch: any) => {
  dispatch(setLoading(true));
  const { data } = await apiInstance.delete(`/product/delete/${id}`);
  dispatch(resetProduct());
};

export const getAllProducts = (agent_id: string) => async (dispatch: any) => {
  dispatch(setLoading(true));
  const { data } = await apiInstance.get(`/product/list/${agent_id}`);
  dispatch(setProductList(data));
};

export const getProductsByFamilyId =
  (family_id: string, agent_id: string) => async (dispatch: any) => {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(
      `/product/getByFamilyId/${family_id}/${agent_id}`
    );
    dispatch(setProductList(data));
  };

export const getProductById =
  (id: string, agent_id: string) => async (dispatch: any) => {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/product/get/${id}/${agent_id}`);
    dispatch(setProduct(data));
  };

export const getProductsDescription =
  (proeduct_id: string) => async (dispatch: any) => {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(
      `/productDescription/getByProductId/${proeduct_id}`
    );
    dispatch(setProductList(data));
  };
