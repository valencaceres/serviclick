import { create } from "zustand";

import { IDistrict } from "../../interfaces/district";

import { apiInstance } from "../../utils/api";

interface districtState {
  district: IDistrict;
  districtList: IDistrict[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: string) => void;
  setDistrict: (district: IDistrict) => void;
  getAll: () => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: IDistrict = {
  id: "",
  district_name: "",
};

export const districtStore = create<districtState>((set, get) => ({
  district: initialData,
  districtList: [],
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

  setDistrict: (district: IDistrict) => {
    set((state) => ({ ...state, district }));
  },

  getAll: async () => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.get(`/district/listAll`);
      set((state) => ({ ...state, districtList: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  reset: () => set((state) => ({ ...state, district: initialData })),

  resetAll: () => set({}, true),
}));
