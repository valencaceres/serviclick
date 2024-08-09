import { create } from "zustand";

import { IUI, IStage } from "../interfaces/ui";

interface uiState {
  ui: IUI;
  loading: boolean;
  error: boolean;
  reset: () => void;
  resetAll: () => void;
  setSlugCode: (code: string) => void;
  setTitle: (title: string) => void;
  setStageAndPlan: (stage: IStage, productPlan_id: string) => void;
  setLeadId: (lead_id: string) => void;
  setUI: (ui: IUI) => void;
}

const initialData: IUI = {
  slugCode: "",
  title: "",
  stage: {
    code: "",
    name: "",
  },
  productPlan_id: "",
  lead_id: "",
  channel: { id: "", name: "" },
  agent: { id: "", name: "" },
  product: { id: "", name: "", price: 0, plan_id: 0 },
  breadCumbs: [],
};

export const uiStore = create<uiState>((set, get) => ({
  ui: initialData,
  loading: false,
  error: false,

  reset: () => set((state) => ({ ...state, ui: initialData })),

  resetAll: () => set({}, true),

  setSlugCode: (code: string) => {
    set((state) => ({ ...state, ui: { ...get().ui, slugCode: code } }));
  },

  setTitle: (title: string) => {
    set((state) => ({ ...state, ui: { ...get().ui, title } }));
  },

  setStageAndPlan: (stage: IStage, productPlan_id: string) => {
    set((state) => ({ ...state, ui: { ...get().ui, stage, productPlan_id } }));
  },

  setLeadId: (lead_id: string) => {
    set((state) => ({ ...state, ui: { ...get().ui, lead_id } }));
  },

  setUI: (ui: IUI) => {
    set((state) => ({ ...state, ui }));
  },
}));
