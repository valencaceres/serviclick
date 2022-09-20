import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";

export type CoverageT = {
  id: string;
  name: string;
  amount: string;
  maximum: string;
  lack: string;
  events: string;
};

type PriceT = {
  customer: number;
  company: number;
};

type FamilyValueT = {
  id: string;
  name: string;
};

type PlanT = {
  id: string;
  createdate: string;
  plan_id: number;
  type: "customer" | "company";
  price: string;
  frequency: "M" | "A" | "S";
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
  plans: PlanT[];
  isActive: boolean;
};

type StateT = {
  list: ProductT[];
  product: ProductT;
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
    plans: [],
    isActive: true,
  },
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductList: (state: StateT, action: PayloadAction<any>) => {
      state.list = action.payload;
    },
    setProduct: (state: StateT, action: PayloadAction<any>) => {
      state.product = action.payload;
    },
    resetProduct: (state: StateT) => {
      state.product = initialState.product;
    },
  },
});

export const { setProductList, setProduct, resetProduct } =
  productSlice.actions;

export default productSlice.reducer;

export const createProduct =
  (
    family_id: string,
    name: string,
    cost: number,
    price: PriceT,
    isSubject: boolean,
    frequency: string,
    term: string,
    beneficiaries: number,
    coverages: CoverageT[],
    familyValues: FamilyValueT[],
    currency: string
  ) =>
  (dispatch: any) => {
    axios
      .post(
        `${config.server}/api/product/create`,
        {
          family_id,
          name,
          cost,
          customerprice: price.customer,
          companyprice: price.company,
          isSubject,
          frequency,
          term,
          beneficiaries,
          coverages,
          familyValues,
          currency,
        },
        {
          headers: {
            id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
          },
        }
      )
      .then((response) => {
        dispatch(listProducts());
        dispatch(setProduct(response.data));
      })
      .catch((error) => console.log(error));
  };

export const updateProduct =
  (
    id: string,
    family_id: string,
    name: string,
    cost: number,
    price: PriceT,
    isSubject: boolean,
    frequency: string,
    term: string,
    beneficiaries: number,
    coverages: CoverageT[],
    familyValues: FamilyValueT[],
    currency: string
  ) =>
  (dispatch: any) => {
    axios
      .put(
        `${config.server}/api/product/update/${id}`,
        {
          family_id,
          name,
          cost,
          customerprice: price.customer,
          companyprice: price.company,
          isSubject,
          frequency,
          term,
          beneficiaries,
          coverages,
          familyValues,
          currency,
        },
        {
          headers: {
            id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
          },
        }
      )
      .then((response) => {
        dispatch(listProducts());
        dispatch(setProduct(response.data));
      })
      .catch((error) => console.log(error));
  };

export const deleteProduct = (id: string) => (dispatch: any) => {
  axios
    .delete(`${config.server}/api/product/delete/${id}`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then(() => {
      dispatch(listProducts());
      dispatch(resetProduct());
    })
    .catch((error) => console.log(error));
};

export const getProduct = (id: string) => (dispatch: any) => {
  axios
    .get(`${config.server}/api/product/get/${id}`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(setProduct(response.data));
    })
    .catch((error) => console.log(error));
};

export const listProducts = () => (dispatch: any) => {
  axios
    .get(`${config.server}/api/product/list`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(setProductList(response.data));
    })
    .catch((error) => console.log(error));
};
