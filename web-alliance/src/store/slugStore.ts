import create from "zustand";

import { apiInstance } from "../utils/api";

import { ISlug } from "../interfaces/slug";

interface slugState {
  slugList: ISlug[];
  slug: ISlug;
  loading: boolean;
  error: boolean;
  reset: () => void;
  resetAll: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setSlug: (slug: ISlug) => void;
  getByCode: any;
}

const initialData = {
  slugList: [],
  slug: {
    id: "",
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
  },
};

export const slugStore = create<slugState>((set, get) => ({
  slugList: initialData.slugList,
  slug: initialData.slug,
  loading: false,
  error: false,

  reset: () => set((state) => ({ ...state, slug: initialData.slug })),

  resetAll: () => set({}, true),

  setLoading: (loading: boolean) => {
    set((state) => ({ ...state, loading }));
  },

  setError: (error: boolean) => {
    set((state) => ({ ...state, error, loading: false }));
  },

  setSlug: (slug: ISlug) => {
    set((state) => ({ ...state, slug }));
  },

  setSlugList: (slugs: ISlug[]) => {
    set((state) => ({ ...state, slugList: slugs }));
  },

  getByCode: async (code: string) => {
    set((state) => ({ ...state, loading: true }));
    const { data } = await apiInstance.get(`/slug/getByCode/${code}`);
    set((state) => ({ ...state, slug: data, loading: false }));
  },
}));
