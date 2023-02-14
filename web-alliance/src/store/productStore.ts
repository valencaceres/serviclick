import { create } from "zustand";

import { IProduct } from "../interfaces/product";

interface productState {
  product: IProduct;
  isLoading: boolean;
  isError: boolean;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: string) => void;
  setProduct: (product: IProduct) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: IProduct = {
  id: "",
  familyId: "",
  name: "",
  cost: 0,
  isSubject: false,
  frequency: "",
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

  reset: () => set((state) => ({ ...state, product: initialData })),

  resetAll: () => set({}, true),
}));
