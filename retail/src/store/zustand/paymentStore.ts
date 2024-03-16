import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import { type Lead, Code } from "../../interfaces/payment";



type OnSuccessCallback = (data: any) => void;

interface paymentState {
  list: Lead[];
  listValue: Code;
  isLoading: boolean;
  isError: boolean;
  error: string;
  setListValue: (data: Code) => void;
  getByRetailId: (id: string) => void;
  upsert: (data: Code) => void;
  reset: () => void;
  resetAll: () => void;
  exportPayments: (
    retail_id: string,
    onSuccess?: OnSuccessCallback
  ) => void;
}

const initialData: Lead = {
  code: "",
  customer: { id: "", rut: "", name: "" },
  date: "",
  lead_id: "",
  product: { id: "", name: "", frequency: "", currency: "", price: 0 },
  time: "",
};
const initialCode: Code = {
  retail_id: "",
  codes: [{ code: "", lead_id: "" }],
};

export const paymentStore = create<paymentState>((set, get) => ({
  list: [initialData],
  listValue: initialCode,
  isLoading: false,
  isError: false,
  error: "",

  set: (lead: Lead) => {
    set((state) => ({ ...state, lead }));
  },

  getByRetailId: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const response = await apiInstance.get(`retail/getPayments/${id}`);
      const { data } = response;
      if (data !== null) {
        const transformedData: Code = {
          retail_id: id,
          codes: data.map((payment: Lead) => ({
            lead_id: payment.lead_id,
            code: payment.code,
          })),
        };
        set((state) => ({
          ...state,
          list: data,
          listValue: transformedData,
          isLoading: false,
          isError: false,
        }));
      } else {
        set((state) => ({
          ...state,
          list: [initialData],
          isLoading: false,
          isError: false,
        }));
      }
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  upsert: async (data: Code) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data: response } = await apiInstance.post(
        `/retail/updatePaymentCodes`,
        data
      );
      set((state) => ({ ...state, case: response, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  setListValue: (data: Code) => {
    set((state) => ({ ...state, listValue: data }));
  },

  exportPayments: async (
    retail_id: string,
  ) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
        const url = `/retail/exportPayments/${retail_id}`;
        const response = await apiInstance.get(url, { responseType: 'arraybuffer' });
if (response && response.data && response.data.byteLength > 0) {
  const byteArray = new Uint8Array(response.data);
  const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'casos.xlsx';

  link.click();
}
      set((state) => ({ ...state, isLoading: false }));
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
      payment: initialData,
      isLoading: false,
      isError: false,
      error: "",
    })),
  resetAll: () => set({}, true),
}));
