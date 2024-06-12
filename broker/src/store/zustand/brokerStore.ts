import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import { Broker, DataStructure } from "../../interfaces/broker";
import { IFamily } from "../../interfaces/family";
interface brokerState {
  broker: Broker
  list: Broker[];
  familiesList: IFamily[];
  summary: DataStructure;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getByUserId: (id: string) => void;
  getDetailsByBrokerId: (id: string) => void;
  getFamiliesByBrokerId: (id: string) => void;
  getBrokerById: (id: string) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: Broker = {
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

export const brokerStore = create<brokerState>((set, get) => ({
  broker: initialData,
  list: [initialData],
  summary: initialDataSummary,
  familiesList: [initialDataFamilies],
  isLoading: false,
  isError: false,
  error: "",

  set: (broker: Broker) => {
    set((state) => ({ ...state, broker }));
  },
  getBrokerById: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`broker/getById/${id}`);
      set((state) => ({
        ...state,
        broker: data,
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
  getByUserId: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      console.log(id)
      const { data } = await apiInstance.get(`broker/getByUserId/${id}`);
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
  getDetailsByBrokerId: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`broker/getCollectionById/${id}`);
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
  getFamiliesByBrokerId: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`broker/getProductsById/${id}`);
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
