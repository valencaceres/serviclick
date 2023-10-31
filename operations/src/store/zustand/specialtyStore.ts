import { create } from "zustand";

import { apiInstance } from "../../utils/api";

interface specialtyStore {
  specialtyList: {
    id: string;
    name: string;
    family_id: string;
    family_name: string;
  }[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  getAll: () => void;
}

export const specialtyStore = create<specialtyStore>((set) => ({
  specialtyList: [],
  isLoading: false,
  isError: false,
  error: "",

  getAll: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/specialty/getAllSpecialties`);
      set((state) => ({ ...state, specialtyList: data, isLoading: false }));
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
