import { create } from "zustand";

import { type RouterOutputs } from "~/utils/api";

type Broker = RouterOutputs["broker"]["getByUser"][number];

interface IUIState {
  title: string;
  setTitle: (title: string) => void;
  broker: Broker | null;
  setBroker: (broker: Broker | null) => void;
}

export const uiStore = create<IUIState>((set) => ({
  title: "",
  setTitle: (title: string) => set({ title }),

  broker: "",
  setBroker: (broker: Broker | null) => set({ broker }),
}));
