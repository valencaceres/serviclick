import { create } from "zustand";

import { apiInstance } from "@/utils/api";

import { IInsured } from "@/interfaces/insured";

interface insuredState {
  insured: IInsured;
  isLoading: boolean;
  isError: boolean;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: string) => void;
  set: (insured: IInsured) => void;
  getByRut: (id: string) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: IInsured = {
  id: "",
  rut: "",
  birthDate: "",
  name: "",
  paternalLastName: "",
  maternalLastName: "",
  email: "",
  phone: "",
  address: "",
  district: "",
};

export const insuredStore = create<insuredState>((set, get) => ({
  insured: initialData,
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

  set: (insured: IInsured) => {
    set((state) => ({ ...state, insured }));
  },

  getByRut: async (rut: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.get(`/insured/getByRut/${rut}`);
      set((state) => ({ ...state, insured: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  reset: () => set((state) => ({ ...state, insured: initialData })),

  resetAll: () => set({}, true),
}));
