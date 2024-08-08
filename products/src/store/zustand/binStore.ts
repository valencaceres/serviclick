import { create } from "zustand";

import { IBin } from "@/interfaces/bin";

import { apiInstance } from "@/utils/api";

interface BinState {
  bin: IBin;
  list: IBin[];
  isLoading: boolean;
  isError: boolean;
  getById: (bin: number) => void;
}

const initialData: IBin = {
  broker_id: "",
  holding: "",
  brand: "",
  bin: 0,
  product: "",
  type: "",
};

export const binStore = create<BinState>((set, get) => ({
  bin: initialData,
  list: [],
  isLoading: false,
  isError: false,

  getById: async (bin: number) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.get(`/bin/getById/${bin}`);
      set((state) => ({ ...state, bin: data.data, isLoading: false }));
    } catch (e: any) {}
  },
}));
