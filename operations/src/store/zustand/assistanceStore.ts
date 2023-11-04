import { create } from "zustand";

import { apiInstance } from "../../utils/api";
import { IAssistanceItem } from "~/interfaces/case";
interface assistanceStore {
  assistance: IAssistanceItem;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getById: (id: string) => void;
}

export const assistanceStore = create<assistanceStore>((set) => ({
  assistance: {
    id: null,
    name: null,
    description: null,
    family: null,
    values: null,
    specialties: null,
    documents: null,
    benefits: null,
    exclusions: null,
  },

  isLoading: false,
  isError: false,
  error: "",

  getById: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/assistance/getById/${id}`);
      set((state) => ({ ...state, assistance: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
}));
