import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import {
  IPartner,
  IPartnerItem,
  IPartnerFamily,
} from "../../interfaces/partner";

interface partnerState {
  list: IPartnerItem[];
  partner: IPartner;
  families: IPartnerFamily[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  set: (partner: IPartner) => void;
  getFamilies: () => void;
  getAll: () => void;
  getByRut: (rut: string) => void;
  getById: (id: string) => void;
  create: (partner: IPartner) => void;
  reset: () => void;
  resetAll: () => void;
  delete: (id: string) => void;
  getBySpecialtyId: (id: string) => void;
  getByAssistanceId: (id: string) => void;

  getByName: (name: string) => void;
}

const initialData: IPartner = {
  id: "",
  rut: "",
  name: "",
  legalrepresentative: "",
  line: "",
  address: "",
  district: "",
  email: "",
  phone: "",
  specialties: [],
};

export const partnerStore = create<partnerState>((set, get) => ({
  list: [],
  partner: initialData,
  families: [],
  isLoading: false,
  isError: false,
  error: "",

  set: (partner: IPartner) => {
    set((state) => ({ ...state, partner }));
  },

  getFamilies: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`partner/getFamilies`);
      set((state) => ({
        ...state,
        families: data,
        isLoading: false,
        isError: false,
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

  getAll: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`partner/getAll`);
      set((state) => ({
        ...state,
        list: data,
        isLoading: false,
        isError: false,
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

  getById: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`partner/getById/${id}`);
      set((state) => ({
        ...state,
        partner: data,
        isLoading: false,
        isError: false,
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

  getByRut: async (rut: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`partner/getByRut/${rut}`);
      if (data === null) {
        return set((state) => ({
          ...state,
          partner: { ...initialData, rut },
          isLoading: false,
          isError: false,
        }));
      }
      set((state) => ({
        ...state,
        partner: data,
        isLoading: false,
        isError: false,
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

  create: async (partner: IPartner) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.post(`partner/create`, partner);
      set((state) => ({
        ...state,
        partner: data,
        isLoading: false,
        isError: false,
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
      partner: initialData,
      isLoading: false,
      isError: false,
      error: "",
    })),

  resetAll: () => set({}, true),

  delete: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      await apiInstance.delete(`partner/deletePartner/${id}`);
      set((state) => ({
        ...state,
        isLoading: false,
        isError: false,
        error: "",
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

  getBySpecialtyId: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`partner/getBySpecialtyId/${id}`);
      set((state) => ({
        ...state,
        list: data,
        isLoading: false,
        isError: false,
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
  getByAssistanceId: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`partner/getByAssistance/${id}`);
      set((state) => ({
        ...state,
        list: data,
        isLoading: false,
        isError: false,
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
  getByName: async (name: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`partner/getByName/${name}`);
      set((state) => ({
        ...state,
        list: data,
        isLoading: false,
        isError: false,
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
}));
