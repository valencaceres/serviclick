import { create } from "zustand";

import { IProduct } from "@/interfaces/product";

import { apiInstance } from "@/utils/api";

interface productState {
  product: IProduct;
  isLoading: boolean;
  isError: boolean;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: string) => void;
  setProduct: (product: IProduct) => void;
  getByPlanId: (productPlan_id: string) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: IProduct = {
  id: "",
  familyId: "",
  name: "",
  promotional: "",
  cost: 0,
  isSubject: false,
  frequency: "M",
  term: "",
  beneficiaries: 0,
  currency: "",
  minInsuredCompanyPrice: 0,
  dueDay: 0,
  plan: {
    id: "",
    createDate: "",
    productId: "",
    planId: 0,
    customerType: "",
    price: 0,
    frequencyCode: "",
    agentId: "",
    discount: {
      type: "",
      percent: 0,
      cicles: 0,
    },
  },
  assistances: [],
  values: [],
};

export const productStore = create<productState>((set, get) => ({
  product: initialData,
  isLoading: false,
  isError: false,
  error: "",

  setIsLoading: (isLoading: boolean) => {
    set((state) => ({ ...state, isLoading }));
  },

  setIsError: (isError: boolean) => {
    set((state) => ({ ...state, isError }));
  },

  setError: (error: string) => {
    set((state) => ({ ...state, error }));
  },

  setProduct: (product: IProduct) => {
    set((state) => ({ ...state, product }));
  },

  getByPlanId: async (productPlan_id: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.get(
        `/product/getByProductPlanId/${productPlan_id}`
      );
      set((state) => ({ ...state, product: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  reset: () => set((state) => ({ ...state, product: initialData })),

  resetAll: () => set({}, true),
}));
