import { create } from "zustand";

import { apiInstance } from "../../utils/api";

interface procedureState {
  procedureList: { id: string; name: string }[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  getAll: () => void;
}

export const procedureStore = create<procedureState>((set) => ({
  procedureList: [],
  isLoading: false,
  isError: false,
  error: "",

  getAll: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/procedure/getAll`);
      set((state) => ({ ...state, procedureList: data, isLoading: false }));
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
