import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import {
  ICase,
  ICaseData,
  ICaseItem,
  IRetailItem,
  IStatusItem,
} from "../../interfaces/case";
interface caseState {
  caseData: ICaseData;

  isLoading: boolean;
  isError: boolean;
  error: string;
  getApplicantByRut: (rut: string) => void;
  reset: () => void;
  upsertApplicant: (data: ICaseData, isBeneficiary: boolean) => Promise<void>;
}

const initialCase: ICase = {
  case_id: null,
  type: null,
  lead_id: null,
  policy: null,
  user_id: null,
  retail: null,
  customer: null,
  insured: null,
  beneficiary: null,
  product: null,
  assistance: null,
  values: null,
  event: null,
  files: null,
  procedure_id: null,
  refund: null,
  is_active: null,
  refund_amount: null,
  retails: null,
  specialist: null,
  alliance: null,
  cost: null,
  history: null,
  case_number: null,
  products: null,
};

const initialCaseData: ICaseData = {
  case_id: null,
  user_id: null,
  type: null,
  insured: null,
  beneficiary: null,
  customer: null,
  retail: null,
  retails: null,
  products: null,
  assistance_id: null,
  lead_id: null,
  values: null,
  event: null,
  files: null,
  procedure_id: null,
  refund_amount: null,
  specialist: null,
  alliance: null,
  cost: null,
  is_active: true,
  case_number: null,
  history: null,
  product: null,
};

export const applicantStore = create<caseState>((set) => ({
  caseData: initialCaseData,
  isLoading: false,
  isError: false,
  error: "",

  getApplicantByRut: async (rut: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/case/getApplicantByRut/${rut}`);
      set((state) => ({ ...state, caseData: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  upsertApplicant: async (data: ICaseData, isBeneficiary: boolean) => {
    try {
      const endpoint = isBeneficiary
        ? "/beneficiary/upsert"
        : "/insured/upsert";
      const beneficiary = isBeneficiary ? data.beneficiary : data.insured;
      const response = await apiInstance.post(endpoint, beneficiary);
      console.log(data);
      set({ caseData: data, isLoading: false });

      return response.data;
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
      caseValue: initialCase,
      caseData: initialCaseData,
    }));
  },
}));
