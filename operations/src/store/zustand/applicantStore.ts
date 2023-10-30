import { create } from "zustand";

import { apiInstance } from "../../utils/api";

<<<<<<< HEAD
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
=======
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
>>>>>>> 3ca24ac1e26422b30ecac96c7e4368735a22310f
  isLoading: false,
  isError: false,
  error: "",

<<<<<<< HEAD
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
=======
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
>>>>>>> 3ca24ac1e26422b30ecac96c7e4368735a22310f
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
<<<<<<< HEAD
      applicant: initialApplicant,
=======
      caseValue: initialCase,
      caseData: initialCaseData,
>>>>>>> 3ca24ac1e26422b30ecac96c7e4368735a22310f
    }));
  },
}));
