import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import {
  ICase,
  ICaseData,
  ICaseItem,
  IRetailItem,
  IStatusItem,
} from "../../interfaces/case";

interface ICaseServices {
  insured_id: string;
  beneficiary_id: string | null;
  retail_id: string | null;
  customer_id: string;
  product_id: string;
  assistance_id: string | null;
}

interface caseState {
  caseValue: ICase;
  caseData: ICaseData;
  caseList: ICaseItem[];
  retailList: IRetailItem[];
  statusList: IStatusItem[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  getRetails: () => void;
  getStatus: () => void;
  getAll: (
    retail_id: string,
    applicant_rut: string,
    applicant_name: string,
    stage_id: string
  ) => void;
  getById: (id: string) => void;
  getServicesAndValues: (data: ICaseServices) => void;
  upsert: (data: ICaseData) => void;
  reset: () => void;
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

export const caseStore = create<caseState>((set) => ({
  caseValue: initialCase,
  caseData: initialCaseData,
  caseList: [],
  retailList: [],
  statusList: [],
  isLoading: false,
  isError: false,
  error: "",

  getRetails: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/case/getRetails`);
      set((state) => ({ ...state, retailList: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  getStatus: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/case/getStatus`);
      set((state) => ({ ...state, statusList: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  /*   retail_id: string,
  applicant_rut: string,
  applicant_name: string,
  stage_id: string */
  getAll: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(
        `/case/getAll`
        /* ?retail_id=${retail_id}&applicant_rut=${applicant_rut}&applicant_name=${applicant_name}&stage_id=${stage_id} */
      );
      set((state) => ({ ...state, caseList: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  getById: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/case/getById/${id}`);
      set((state) => ({ ...state, caseValue: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  getServicesAndValues: async (data: ICaseServices) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data: response } = await apiInstance.post(
        `/case/getServicesAndValues`,
        data
      );
      set((state) => ({ ...state, caseData: response, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  upsert: async (data: ICaseData) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data: response } = await apiInstance.post(`/case/upsert`, data);
      set((state) => ({ ...state, caseValue: response, isLoading: false }));
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
