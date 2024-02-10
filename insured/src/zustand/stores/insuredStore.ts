import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import { IProfile, IBeneficiary } from "../../interfaces/insured";

interface insuredState {
  profile: IProfile;
  isLoading: boolean;
  isError: boolean;
  error: string;
  beneficiaryList: IBeneficiary[]

  getProfile: (rut: string) => void;
  reset: () => void;
  resetAll: () => void;
  setBeneficiaryList: (beneficiaryList: IBeneficiary[]) => void;

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
  beneficiaryList: [],
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
  setBeneficiaryList: (beneficiaryList: IBeneficiary[]) =>
  set((state) => ({ ...state, beneficiaryList: beneficiaryList })),

  reset: () => set((state) => ({ ...state, insured: initialData })),
  resetAll: () => set({}, true),
}));
