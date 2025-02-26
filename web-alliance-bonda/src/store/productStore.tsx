import { create } from "zustand";

import { apiInstance } from "../utils/api";
import config from "../utils/config";

import { IProduct, IProductDetail } from "@/interfaces/product";

interface ProductState {
  product: IProductDetail;
  productList: IProduct[];
  isLoading: boolean;
  isError: boolean;
  getProductList: () => void;
  getAssistancesByBrokerIdAndProductId: (product_id: string) => void;
}

const initialStateProduct: IProduct = {
  id: "",
  icon: "",
  name: "",
  products: {
    id: "",
    productPlan_id: "",
    description: "",
    name: "",
    currency: "",
    frequency: "",
    price: 0,
    basePrice: 0,
    beneficiary_price: 0,
    yearly_price: 0,
    yearly_plan_id: 0,
    pdfBase64: "",
  },
};

const initialDataProductDetail: IProductDetail = {
  product_id: "",
  product_name: "",
  family_id: "",
  family_name: "",
  product_cost: 0,
  frequency_code: "",
  term: "",
  beneficiaries: 0,
  currency: "",
  due_day: 0,
  productplan_id: "",
  price: {
    base_price: 0,
    price: 0,
    beneficiary_price: 0,
  },
  description: {
    title: "",
    sub_title: "",
    alias: "",
    promotional: "",
    description: "",
    territorial_scope: "",
    hiring_conditions: "",
  },
  assistances: [],
};

export const productProduct = create<ProductState>((set) => ({
  product: initialDataProductDetail,
  productList: [],
  isLoading: true,
  isError: false,

  getProductList: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(
        `/broker/getProductsById/${config.service}`
      );
      set((state) => ({
        ...state,
        productList: data,
        isLoading: false,
        isError: false,
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
      }));
    }
  },

  getAssistancesByBrokerIdAndProductId: async (product_id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(
        `/broker/getAssistancesByBrokerIdAndProductId?broker_id=${config.service}&product_id=${product_id}`
      );
      set((state) => ({
        ...state,
        product: data,
        isLoading: false,
        isError: false,
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
      }));
    }
  },
}));
