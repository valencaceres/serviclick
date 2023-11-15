import { create } from "zustand";

import { IProcess } from "@/interfaces/agent";

import { apiInstance } from "@/utils/api";

interface agentState {
  process: IProcess;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getProcessById: (id: string) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialDataProcess: IProcess = {
  product: {
    id: "",
    name: "",
  },
  agent: {
    type: "",
    id: "",
    name: "",
  },
  process: {
    code: "",
    url: "",
  },
};

export const agentStore = create<agentState>((set, get) => ({
  process: initialDataProcess,
  isLoading: false,
  isError: false,
  error: "",

  getProcessById: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/agent/getProcessById/${id}`);
      set((state) => ({
        ...state,
        process: data,
        isLoading: false,
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

  reset: () => set((state) => ({ ...state, process: initialDataProcess })),

  resetAll: () => set({}, true),
}));
