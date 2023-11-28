import { create } from "zustand";

interface IUIState {
  title: string;
  setTitle: (title: string) => void;
}

export const uiStore = create<IUIState>((set) => ({
  title: "",

  setTitle: (title: string) => set({ title }),
}));
