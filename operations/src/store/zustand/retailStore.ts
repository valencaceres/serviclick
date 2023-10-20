import { create } from "zustand";

interface retailState {
  dataLoading: {
    total: number;
    productPlan_id: string;
    data: any;
    success: any;
    error: any;
  };
  isLoading: boolean;
  isError: boolean;
  error: string;
  setDataLoading: (data: any) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: any = {
  dataLoading: { count: 0, total: 0 },
  isLoading: false,
  isError: false,
  error: "",
};

export const retailStore = create<retailState>((set, get) => ({
  dataLoading: {
    total: 0,
    productPlan_id: "",
    data: new Set(),
    success: new Set(),
    error: new Set(),
  },
  isLoading: false,
  isError: false,
  error: "",

  setDataLoading: (data: any) => {
    set((state) => ({
      ...state,
      dataLoading: {
        total: data.total,
        productPlan_id: data.productPlan_id,
        data: state.dataLoading.data.add(data.lead_id),
        success: data.success
          ? state.dataLoading.success.add(data.lead_id)
          : state.dataLoading.success,
        error: !data.success
          ? state.dataLoading.error.add(data.lead_id)
          : state.dataLoading.error,
      },
    }));
  },

  reset: () =>
    set((state) => ({
      ...state,
      retail: initialData,
    })),

  resetAll: () => set({}, true),
}));
