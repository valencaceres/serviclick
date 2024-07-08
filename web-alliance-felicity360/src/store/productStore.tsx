import { create } from "zustand";

import { apiInstance } from "@/utils/api";
import config from "@/utils/config";

import { IProduct, IProductDetail } from "@/interfaces/product";

interface ProductState {
  product: IProductDetail,
  productList: IProduct[],
  isLoading: boolean,
  isError: boolean,
  getProductList: () => void
  getProductsById: (product_id: string) => void,
}

const initialStateProduct: IProduct = {
  id: '',
  icon: '',
  name: '',
  products: {
    id: '',
    productPlan_id: '',
    description: '',
    name: '',
    currency: '',
    frequency: '',
    price: 0,
    basePrice: 0,
    beneficiary_price: 0,
    yearly_price: 0,
    yearly_plan_id: 0,
    pdfBase64: '',
  }
};

const initialDataProductDetail = {
  id: "",
  productPlan_id: '',
    name: "",
    basePrice: 0,
    price: 0,
    beneficiaryPrice: 0,
    description:"",
    assistances: []
}



export const productProduct = create<ProductState>((set) => ({
  product: initialDataProductDetail,
  productList: [],
  isLoading: true,
  isError: false,
  
  getProductList: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`broker/getProductsById/${config.service}`);
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
  getProductsById: async (product_id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`product/getById/${product_id}`);
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
  }
}))