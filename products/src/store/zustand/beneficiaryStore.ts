import { create } from "zustand";

import { IBeneficiary } from "@/interfaces/beneficiary";

import { apiInstance } from "@/utils/api";

interface beneficiaryState {
  beneficiary: IBeneficiary;
  beneficiaryList: IBeneficiary[];
  
  isLoading: boolean;
  isError: boolean;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: string) => void;
  setBeneficiary: (beneficiary: IBeneficiary) => void;
  setBeneficiaryList: (beneficiaryList: IBeneficiary[]) => void;
  getByRut: (rut: string) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: IBeneficiary = {
  id: "",
  rut: "",
  name: "",
  paternalLastName: "",
  maternalLastName: "",
  birthDate: "",
  address: "",
  district: "",
  email: "",
  phone: "",
  relationship: "",
};

export const beneficiaryStore = create<beneficiaryState>((set, get) => ({
  beneficiary: initialData,
  beneficiaryList: [],
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

  setBeneficiary: (beneficiary: IBeneficiary) => {
    set((state) => ({ ...state, beneficiary }));
  },
  setBeneficiaryList: (beneficiaryList: IBeneficiary[]) => {
    set((state) => ({ ...state, beneficiaryList }));
  },

  getByRut: async (rut: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.get(`/beneficiary/getByRut/${rut}`);
      set((state) => ({ ...state, beneficiary: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  reset: () => set((state) => ({ ...state, beneficiary: initialData })),

  resetAll: () => set({}, true),
}));
