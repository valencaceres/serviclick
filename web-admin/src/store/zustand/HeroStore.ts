import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import {
  HeroItem,
  heroResponse,
  CategoryResponse,
  CategoryItem,
  Family,
} from "../../interfaces/hero";
interface userState {
  list: heroResponse;
  categoryList: CategoryItem[];
  familyList: Family[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  post: (
    url: string,
    alt: string,
    text: string,
    link: string,
    type: string,
    category_id: string,
    family_id: string,
    options?: { onSuccess?: () => void }
  ) => Promise<void>;
  updateOrder: (
    heroArray: Array<{
      url: string;
      alt: string;
      text: string;
      number: number;
      id: string;
    }>,
    type: string,
    options?: { onSuccess?: () => void; onError?: () => void }
  ) => Promise<void>;
  update: (
    alt: string,
    text: string,
    id: string,
    type: string,
    link: string,
    category_id: string,
    family_id: string,
    options?: { onSuccess?: () => void }
  ) => Promise<void>;
  deleteById: (
    id: string,
    type: string,
    options?: { onSuccess?: () => void }
  ) => Promise<void>;
  getCategories: () => void;
  getFamilies: () => void;
  getAll: (type: string) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: heroResponse = {
  data: [],
};

export const heroStore = create<userState>((set, get) => ({
  list: initialData,
  categoryList: [],
  familyList: [],
  isLoading: false,
  isError: false,
  error: "",

  set: (hero: heroResponse) => {
    set((state) => ({ ...state, hero }));
  },

  getAll: async (type: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`web/getHero?type=${type}`);
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
  getCategories: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`category/getAll`);
      set((state) => ({
        ...state,
        categoryList: data,
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
  getFamilies: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`family/list`);
      set((state) => ({
        ...state,
        familyList: data,
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

  post: async (
    url: string,
    alt: string,
    text: string,
    type: string,
    link: string,
    category_id: string,
    family_id: string,
    options?: { onSuccess?: () => void }
  ) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.post(`web/createHero?type=${type}`, {
        url,
        alt,
        text,
        category_id,
        link,
        family_id,
      });
      set((state) => ({
        ...state,
        isLoading: false,
        isError: false,
      }));
      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  update: async (
    alt: string,
    text: string,
    id: string,
    link: string,
    type: string,
    category_id: string,
    family_id: string,
    options?: { onSuccess?: () => void }
  ) => {
    try {
      console.log(category_id);
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.put(`web/updateHero?type=${type}`, {
        alt,
        text,
        id,
        category_id,
        link,
        family_id,
      });
      set((state) => ({
        ...state,
        isLoading: false,
        isError: false,
      }));
      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  deleteById: async (
    id: string,
    type: string,
    options?: { onSuccess?: () => void }
  ) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.delete(
        `web/deleteHeroById/${id}?type=${type}`
      );
      set((state) => ({
        ...state,
        isLoading: false,
        isError: false,
      }));
      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  updateOrder: async (
    heroArray: Array<{
      url: string;
      alt: string;
      text: string;
      number: number;
      id: string;
    }>,
    type: string,
    options?: { onSuccess?: () => void; onError?: () => void }
  ) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.put(`web/orderHero?type=${type}`, {
        heroArray,
      });
      set((state) => ({
        ...state,
        list: data,
        isLoading: false,
        isError: false,
      }));
      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
      if (options?.onError) {
        options.onError();
      }
    }
  },

  reset: () =>
    set((state) => ({
      ...state,
      hero: initialData,
      isLoading: false,
      isError: false,
      error: "",
    })),
  resetAll: () => set({}, true),
}));
