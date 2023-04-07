import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import { IProfile } from "../../interfaces/insured";

interface insuredState {
  profile: IProfile;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getProfile: (rut: string) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialData: IProfile = {
  insured: {
    id: "",
    rut: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    district: "",
    birthdate: "",
    maternallastname: "",
    paternallastname: "",
  },
  products: [],
};

export const insuredStore = create<insuredState>((set, get) => ({
  profile: initialData,
  isLoading: false,
  isError: false,
  error: "",

  getProfile: async (rut: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const { data } = await apiInstance.get(`/insured/getProfile/${rut}`);
      set((state) => ({ ...state, profile: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  reset: () => set((state) => ({ ...state, insured: initialData })),
  resetAll: () => set({}, true),
}));
