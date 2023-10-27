import { create } from "zustand";

import { apiInstance } from "../../utils/api";

interface qualificationState {
  qualificationList: { id: string; name: string }[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  getAll: () => void;
}

export const qualificationStore = create<qualificationState>((set) => ({
  qualificationList: [],
  isLoading: false,
  isError: false,
  error: "",

  getAll: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/qualification/getAll`);
      set((state) => ({ ...state, qualificationList: data, isLoading: false }));
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
