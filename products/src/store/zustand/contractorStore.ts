import { create } from "zustand";

import { IContractor } from "../../interfaces/contractor";

import { apiInstance } from "../../utils/api";

interface contractorState {
  contractor: IContractor;
  contractorList: IContractor[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: string) => void;
  setContractor: (contractor: IContractor) => void;
  getAll: (type: string, nameLike: string, active: boolean) => void;
  getByRut: (rut: string, type: string) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: IContractor = {
  id: "",
  type: "",
  rut: "",
  companyName: "",
  name: "",
  paternalLastName: "",
  maternalLastName: "",
  legalRepresentative: "",
  line: "",
  birthDate: "",
  address: "",
  district: "",
  email: "",
  phone: "",
};

export const contractorStore = create<contractorState>((set, get) => ({
  contractor: initialData,
  contractorList: [],
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

  setContractor: (contractor: IContractor) => {
    set((state) => ({ ...state, contractor }));
  },

  getAll: async (
    type: string = "",
    nameLike: string = "",
    active: boolean = true
  ) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.post(`/contractor/getAll`, {
        contractorType: type,
        nameLike,
        active,
      });
      set((state) => ({ ...state, contractorList: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  getByRut: async (rut: string, type: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.get(
        `/contractor/getByRut/${rut}/${type}`
      );
      set((state) => ({ ...state, contractor: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  reset: () => set((state) => ({ ...state, contractor: initialData })),

  resetAll: () => set({}, true),
}));
