import { create } from "zustand";

import { IPerson } from "../interfaces/person";

interface personState {
  person: IPerson;
  isLoading: boolean;
  isError: boolean;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: string) => void;
  setPerson: (person: IPerson) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: IPerson = {
  id: "",
  rut: "",
  name: "",
  paternalLastName: "",
  maternalLastName: "",
  email: "",
  phone: "",
  address: "",
  district: "",
};

export const personStore = create<personState>((set, get) => ({
  person: initialData,
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

  setPerson: (person: IPerson) => {
    set((state) => ({ ...state, person }));
  },

  reset: () => set((state) => ({ ...state, person: initialData })),

  resetAll: () => set({}, true),
}));
