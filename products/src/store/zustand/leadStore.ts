import { create } from "zustand";

import { apiInstance } from "@/utils/api";

import { ILead } from "@/interfaces/lead";

interface leadState {
  lead: ILead;
  isLoading: boolean;
  isError: boolean;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: string) => void;
  set: (lead: ILead) => void;
  getById: (id: string) => void;
  getBySubscriptionId: (subscription_id: number) => void;
  create: (lead: ILead) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: ILead = {
  id: "",
  agent_id: "",
  user_id: "",
  customer: {
    id: "",
    rut: "",
    name: "",
    birthDate: "",
    paternalLastName: "",
    maternalLastName: "",
    address: "",
    district: "",
    email: "",
    phone: "",
  },
  company: {
    id: "",
    rut: "",
    companyName: "",
    legalRepresentative: "",
    line: "",
    address: "",
    district: "",
    email: "",
    phone: "",
  },
  product: {
    id: "",
    price: 0,
    currency_code: "",
    frequency_code: "",
    productPlan_id: 0,
    beneficiary_price: 0,
  },
  insured: [],
  link: "",
  subscriptionData: {
    id: 0,
    completion_url: "",
    security_token: "",
    status_code: 0,
  },
  subscription: false,
  send: false,
};

export const leadStore = create<leadState>((set, get) => ({
  lead: initialData,
  isLoading: false,
  isError: false,
  error: "",

  setIsLoading: (isLoading: boolean) => {
    set((state) => ({ ...state, isLoading }));
  },

  setIsError: (isError: boolean) => {
    set((state) => ({ ...state, isError }));
  },

  setError: (error: string) => {
    set((state) => ({ ...state, error }));
  },

  set: (lead: ILead) => {
    set((state) => ({ ...state, lead }));
  },

  getById: async (id: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.get(`/lead/getById/${id}`);
      set((state) => ({ ...state, lead: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  getBySubscriptionId: async (subscription_id: number) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.get(
        `/lead/getBySubscriptionId/${subscription_id}`
      );
      set((state) => ({ ...state, lead: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  create: async (lead: ILead) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post(`/lead/create`, lead);
      set((state) => ({
        ...state,
        lead: { ...data, subscriptionData: data.subscription },
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

  reset: () => set((state) => ({ ...state, lead: initialData })),

  resetAll: () => set({}, true),
}));
