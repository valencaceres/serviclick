import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import { IInsured, IInsuredItem } from "../../interfaces/insured";

interface insuredState {
  list: {
    summary: {
      insured: number;
      products: number;
    };
    pagination: {
      total: number;
      page: number;
      records: number;
    };
    data: IInsuredItem[];
  };
  insured: IInsured;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getByRutOrName: (
    rut: string,
    name: string,
    records: number,
    page: number
  ) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: IInsured = {
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

export const insuredStore = create<insuredState>((set, get) => ({
  list: {
    summary: {
      insured: 0,
      products: 0,
    },
    pagination: {
      total: 0,
      page: 0,
      records: 0,
    },
    data: [],
  },
  insured: initialData,
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

      const { data } = await apiInstance.get(`insured/getByRutOrName${url}`);
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
      insured: initialData,
      isLoading: false,
      isError: false,
      error: "",
    })),

  resetAll: () => set({}, true),
}));
