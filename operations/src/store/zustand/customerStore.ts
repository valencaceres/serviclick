import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import { ICustomer, ICustomerItem } from "../../interfaces/customer";

interface customerState {
  list: {
    summary: {
      customer: number;
      products: number;
    };
    pagination: {
      total: number;
      page: number;
      records: number;
    };
    data: ICustomerItem[];
  };
  customer: ICustomer;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getByRutOrName: (
    rut: string | null,
    name: string | null,
    records: number | null,
    page: number | null
  ) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: ICustomer = {
  id: "",
  rut: "",
  name: "",
  legalrepresentative: "",
  line: "",
  address: "",
  district: "",
  email: "",
  phone: "",
  specialties: [],
};

export const customerStore = create<customerState>((set, get) => ({
  list: {
    summary: {
      customer: 0,
      products: 0,
    },
    pagination: {
      total: 0,
      page: 0,
      records: 0,
    },
    data: [],
  },
  customer: initialData,
  isLoading: false,
  isError: false,
  error: "",

  getByRutOrName: async (
    rut: string | null,
    name: string | null,
    records: number | null,
    page: number | null
  ) => {
    try {
      let url = "";

      set((state) => ({ ...state, isLoading: true }));

      if (rut) {
        url += `?rut=${rut}`;
      }

      if (name) {
        url += rut ? "&" : "?";
        url += `name=${name}`;
      }

      if (records) {
        url += rut || name ? "&" : "?";
        url += `records=${records}`;
      }

      if (page) {
        url += rut || name || records ? "&" : "?";
        url += `page=${page}`;
      }

      const { data } = await apiInstance.get(`customer/getByRutOrName${url}`);
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

  reset: () =>
    set((state) => ({
      ...state,
      customer: initialData,
      isLoading: false,
      isError: false,
      error: "",
    })),

  resetAll: () => set({}, true),
}));
