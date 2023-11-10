import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import { Retail, DataStructure } from "../../interfaces/retail";
import { IFamily } from "../../interfaces/family";
interface retailState {
  list: Retail[];
  familiesList: IFamily[];
  summary: DataStructure;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getByUserId: (id: string) => void;
  getDetailsByRetailId: (id: string) => void;
  getFamiliesByRetailId: (id: string) => void;

  reset: () => void;
  resetAll: () => void;
}

const initialData: Retail = {
  id: "",
  rut: "",
  name: "",
};
const initialDataSummary: DataStructure = {
  detail: [],
  summary: {
    charged: null,
    due: null,
    paid: null,
    quantity: null,
  },
};
const initialDataFamilies: IFamily = {
  icon: "",
  id: "",
  name: "",
  products: [],
};

export const retailStore = create<retailState>((set, get) => ({
  list: [initialData],
  summary: initialDataSummary,
  familiesList: [initialDataFamilies],
  isLoading: false,
  isError: false,
  error: "",

  set: (retail: Retail) => {
    set((state) => ({ ...state, retail }));
  },

  getByUserId: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      console.log(id);
      const { data } = await apiInstance.get(`retail/getByUserId/${id}`);
      set((state) => ({
        ...state,
        list: data,
        isLoading: false,
        isError: false,
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  getDetailsByRetailId: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`retail/getCollectionById/${id}`);
      set((state) => ({
        ...state,
        summary: data,
        isLoading: false,
        isError: false,
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  getFamiliesByRetailId: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`retail/getProductsById/${id}`);
      set((state) => ({
        ...state,
        familiesList: data,
        isLoading: false,
        isError: false,
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  reset: () =>
    set((state) => ({
      ...state,
      partner: initialData,
      isLoading: false,
      isError: false,
      error: "",
    })),
  resetAll: () => set({}, true),
}));
