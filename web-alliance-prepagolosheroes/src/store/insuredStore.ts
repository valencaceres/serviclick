import { create } from "zustand";

import { IInsured } from "../interfaces/insured";

interface insuredState {
  insured: IInsured;
  isLoading: boolean;
  isError: boolean;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: string) => void;
  setInsured: (insured: IInsured) => void;
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

  setInsured: (insured: IInsured) => {
    set((state) => ({ ...state, insured }));
  },

  reset: () => set((state) => ({ ...state, insured: initialData })),

  resetAll: () => set({}, true),
}));
