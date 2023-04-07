import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import { IUserInsured } from "../../interfaces/userInsured";

interface userInsuredState {
  userInsured: IUserInsured;
  isLoading: boolean;
  isError: boolean;
  error: string;
  validate: (login: string, password: string) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: IUserInsured = {
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
  hash: "",
  leads: [],
};

export const userInsuredStore = create<userInsuredState>((set, get) => ({
  userInsured: initialData,
  isLoading: false,
  isError: false,
  error: "",

  validate: async (login: string, password: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.post(`/userInsured/validate`, {
        login,
        password,
      });
      set((state) => ({ ...state, userInsured: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  reset: () => set((state) => ({ ...state, userInsured: initialData })),
  resetAll: () => set({}, true),
}));
