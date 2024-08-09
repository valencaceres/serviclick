import { create } from "zustand";

import { ISlug } from "../interfaces/slug";

interface slugState {
  slug: ISlug;
  isLoading: boolean;
  isError: boolean;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: string) => void;
  setSlug: (slug: ISlug) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: ISlug = {
  id: "",
  code: "",
  rut: "",
  name: "",
  line: "",
  fantasyName: "",
  address: "",
  district: "",
  email: "",
  phone: "",
  logo: "",
  legalRepresentatives: [],
  products: [],
};

export const slugStore = create<slugState>((set, get) => ({
  slug: initialData,
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

  setSlug: (slug: ISlug) => {
    set((state) => ({ ...state, slug }));
  },

  reset: () => set((state) => ({ ...state, slug: initialData })),

  resetAll: () => set({}, true),
}));
