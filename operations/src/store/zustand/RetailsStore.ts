import { create } from "zustand";

import { apiInstance } from "../../utils/api";

interface retailsStore {
  retailList: { id: string; rut: string; name: string }[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  getAll: () => void;
}

export const retailsStore = create<retailsStore>((set) => ({
  retailList: [],
  isLoading: false,
  isError: false,
  error: "",

  getAll: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/retail/getAll`);
      set((state) => ({ ...state, retailList: data, isLoading: false }));
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
