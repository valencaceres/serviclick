import { create } from "zustand";

import { IUI } from "../../interfaces/ui";

interface uiState {
  ui: IUI;
  setTitle: (title: string) => void;
  setShowButtonBack: (showButtonBack: boolean, pathButtonBack?: string) => void;
  setIsDesktop: (isDesktop: boolean) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: IUI = {
  title: "",
  showButtonBack: false,
  pathButtonBack: "",
  isDesktop: true,
};

export const uiStore = create<uiState>((set, get) => ({
  ui: initialData,

  setTitle: (title: string) => {
    set((state) => ({
      ...state,
      ui: { ...state.ui, title },
    }));
  },

  setShowButtonBack: (showButtonBack: boolean, pathButtonBack?: string) => {
    set((state) => ({
      ...state,
      ui: { ...state.ui, showButtonBack, pathButtonBack: pathButtonBack || "" },
    }));
  },

  setIsDesktop: (isDesktop: boolean) => {
    set((state) => ({
      ...state,
      ui: { ...state.ui, isDesktop },
    }));
  },

  reset: () => set((state) => ({ ...state, ui: initialData })),
  resetAll: () => set({}, true),
}));
