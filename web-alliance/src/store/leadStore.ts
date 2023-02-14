import { create } from "zustand";

import { ILead } from "../interfaces/lead";

interface leadState {
  lead: ILead;
  isLoading: boolean;
  isError: boolean;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: string) => void;
  setLead: (lead: ILead) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: ILead = {
  id: "",
  agent_id: "",
  customer: {
    id: "",
    rut: "",
    name: "",
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
  },
  insured: [],
  link: "",
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

  setLead: (lead: ILead) => {
    set((state) => ({ ...state, lead }));
  },

  reset: () => set((state) => ({ ...state, lead: initialData })),

  resetAll: () => set({}, true),
}));
