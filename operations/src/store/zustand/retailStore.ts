import { create } from "zustand";
import { IRetail } from "~/interfaces/retail";
import { apiInstance } from "~/utils/api";
interface retailState {
  dataLoading: {
    total: number;
    productPlan_id: string;
    data: any;
    success: any;
    error: any;
  };
  list: IRetail[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  getAll: () => void;
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
const initialRetail: IRetail[] = [];

export const retailStore = create<retailState>((set, get) => ({
  dataLoading: {
    total: 0,
    productPlan_id: "",
    data: new Set(),
    success: new Set(),
    error: new Set(),
  },
  list: initialRetail,
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
  getAll: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/retail/getProductsAndRetail`);
      set((state) => ({
        ...state,
        list: data,
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

  reset: () =>
    set((state) => ({
      ...state,
      retail: initialData,
    })),

  resetAll: () => set({}, true),
}));
