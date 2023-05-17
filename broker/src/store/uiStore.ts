import { create } from "zustand";

import { type IFamily } from "~/interfaces/family";

import { type RouterOutputs } from "~/utils/api";

type Broker = RouterOutputs["broker"]["getByUser"][number];

interface IUIState {
  title: string;
  setTitle: (title: string) => void;
  broker: Broker | null;
  setBroker: (broker: Broker | null) => void;
  family: IFamily | null;
  setFamily: (family: IFamily | null) => void;
}

export const uiStore = create<IUIState>((set) => ({
  title: "",
  setTitle: (title: string) => set({ title }),

  broker: null,
  setBroker: (broker: Broker | null) => set({ broker }),

  family: null,
  setFamily: (family: IFamily | null) => set({ family }),
}));
