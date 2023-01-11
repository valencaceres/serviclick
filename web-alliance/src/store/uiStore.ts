import create from "zustand";

import { apiInstance } from "../utils/api";

import { IUI } from "../interfaces/ui";

interface uiState {
  ui: IUI;
  loading: boolean;
  error: boolean;
  reset: () => void;
  resetAll: () => void;
  setUI: (ui: IUI) => void;
}

const initialData: IUI = {
  channel: { id: "", name: "" },
  agent: { id: "", name: "" },
  product: { id: "", name: "", price: 0, plan_id: 0 },
};

export const uiStore = create<uiState>((set, get) => ({
  ui: initialData,
  loading: false,
  error: false,
  reset: () => set((state) => ({ ...state, ui: initialData })),
  resetAll: () => set({}, true),
  setUI: (ui: IUI) => {
    set((state) => ({ ...state, ui }));
  },
}));
