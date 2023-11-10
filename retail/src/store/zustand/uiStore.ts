import { create } from "zustand";

import { type IFamily } from "~/interfaces/family";
import { type Retail } from "~/interfaces/retail";

interface IUIState {
  title: string;
  setTitle: (title: string) => void;
  retail: Retail | null;
  setRetail: (retail: Retail | null) => void;
  family: IFamily | null;
  setFamily: (family: IFamily | null) => void;
}

export const uiStore = create<IUIState>((set) => ({
  title: "",
  setTitle: (title: string) => set({ title }),

  retail: null,
  setRetail: (retail: Retail | null) => set({ retail }),

  family: null,
  setFamily: (family: IFamily | null) => set({ family }),
}));
