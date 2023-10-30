import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import { IApplicant } from "../../interfaces/applicant";

interface applicantState {
  applicant: IApplicant;
  isLoading: boolean;
  isError: boolean;
  error: string;
  upsert: (type: string, data: IApplicant) => void;
  reset: () => void;
}

const initialApplicant: IApplicant = {
  type: "",
  id: "",
  rut: "",
  name: "",
  paternalLastName: "",
  maternalLastName: "",
  address: "",
  district: "",
  email: "",
  phone: "",
  birthDate: "",
};

export const applicantStore = create<applicantState>((set) => ({
  applicant: initialApplicant,
  isLoading: false,
  isError: false,
  error: "",

  upsert: async (type: string, data: IApplicant) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const response = await apiInstance.post(
        `/${type === "I" ? "insured" : "beneficiary"}/upsert`,
        data
      );
      set((state) => ({
        ...state,
        applicant: data,
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

  reset: () => {
    set((state) => ({
      ...state,
      applicant: initialApplicant,
    }));
  },
}));
