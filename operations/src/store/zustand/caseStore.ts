import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import { IData } from "../../interfaces/case";

interface caseState {
  data: IData;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getBeneficiaryData: (rut: string) => void;
}

const initialData: IData = {
  beneficiary: {
    type: "",
    id: "",
    rut: "",
    name: "",
    paternallastname: "",
    maternallastname: "",
    address: "",
    district: "",
    email: "",
    phone: "",
    birthdate: "",
  },
  products: [
    {
      id: "",
      name: "",
      assistance: {
        id: "",
        name: "",
        amount: 0,
        currency: "",
        maximum: 0,
        events: 0,
        lack: 0,
      },
    },
  ],
};

export const caseStore = create<caseState>((set) => ({
  data: initialData,
  isLoading: false,
  isError: false,
  error: "",

  getBeneficiaryData: async (rut: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(
        `/case/getBeneficiaryByRut/${rut}`
      );
      if (data === null) {
        return set((state) => ({
          ...state,
          data: { ...initialData, rut },
          isLoading: false,
          isError: true,
        }));
      }
      set((state) => ({
        ...state,
        data: {
          ...state.data,
          beneficiary: {
            ...data.beneficiary,
          },
          products: data.products,
        },
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
