import { create } from "zustand";

import { apiInstance } from "../../utils/api";
import { IAssistanceItem } from "~/interfaces/case";
interface assistanceStore {
  assistance: IAssistanceItem;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getById: (id: string) => void;
  uploadDocument: (formData: any) => void;
}

export const assistanceStore = create<assistanceStore>((set) => ({
  assistance: {
    id: null,
    name: null,
    description: null,
    family: null,
    values: null,
    specialties: null,
    documents: null,
    benefits: null,
    exclusions: null,
  },

  isLoading: false,
  isError: false,
  error: "",

  getById: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/assistance/getById/${id}`);
      set((state) => ({ ...state, assistance: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  uploadDocument: async (formData: any) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.post(`/case/uploadDocument`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({ ...state, assistance: { ...state.assistance, documents: data }, isLoading: false }));
      return data; // Devuelve los datos en caso de éxito
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
      throw e; // Lanza el error para que pueda ser capturado
    }
  },
}));
