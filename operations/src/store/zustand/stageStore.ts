import { create } from "zustand";

import { apiInstance } from "../../utils/api";

interface stageState {
  stageList: { id: string; name: string; code: string }[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  getAll: () => void;
}

export const stageStore = create<stageState>((set) => ({
  stageList: [],
  isLoading: false,
  isError: false,
  error: "",

  getAll: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/stage/getAll`);
      set((state) => ({ ...state, stageList: data, isLoading: false }));
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
