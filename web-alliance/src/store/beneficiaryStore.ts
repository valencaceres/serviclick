import { create } from "zustand";

import { IBeneficiary } from "../interfaces/beneficiary";

interface beneficiaryState {
  beneficiary: IBeneficiary;
  isLoading: boolean;
  isError: boolean;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: string) => void;
  setBeneficiary: (beneficiary: IBeneficiary) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: IBeneficiary = {
  id: "",
  rut: "",
  birthDate: "",
  name: "",
  paternalLastName: "",
  maternalLastName: "",
  email: "",
  phone: "",
  address: "",
  district: "",
  relationship: "",
};

export const beneficiaryStore = create<beneficiaryState>((set, get) => ({
  beneficiary: initialData,
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

  reset: () => set((state) => ({ ...state, beneficiary: initialData })),

  resetAll: () => set({}, true),
}));
