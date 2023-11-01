import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import {
  ICase,
  ICaseItem,
  IRetailItem,
  IStatusItem,
  IProduct,
  IAssistance,
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
  products: IProduct[] | null;
  assistances: IAssistance[] | null;
  case: ICase;
  caseId: ICase;
  caseList: ICaseItem[];
  retailList: IRetailItem[];
  statusList: IStatusItem[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  setCase: (data: ICase) => void;
  getApplicantByRut: (rut: string) => void;
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
  upsert: (data: ICase) => void;
  resetNoRut: (applicantCode: "insured" | "beneficiary", rut: string) => void;
  reset: () => void;
}

const initialCase: ICase = {
  case_id: null,
  case_number: 0,
  user_id: "",
  date: "",
  time: "",
  type: "I",
  lead_id: "",
  policy: {
    id: null,
    startDate: "",
    endDate: "",
  },
  retail: null,
  customer: {
    id: "",
    rut: "",
    name: "",
  },
  insured: {
    type: "I",
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
  },
  beneficiary: null,
  product: {
    id: "",
    name: "",
  },
  assistance: {
    id: "",
    name: "",
    assigned: {
      amount: 0,
      currency: "",
      maximum: "",
      events: 0,
      lack: 0,
    },
    used: {
      events: 0,
      total_amount: 0,
    },
  },
  values: null,
  event: null,
  files: null,
  procedure_id: null,
  refund: null,
  specialist: null,
  alliance: null,
  cost: null,
  history: [],
};

export const caseStore = create<caseState>((set) => ({
  products: [],
  assistances: [],
  caseId: initialCase,
  case: initialCase,
  caseList: [],
  retailList: [],
  statusList: [],
  isLoading: false,
  isError: false,
  error: "",

  setCase: (data: ICase) => {
    set((state) => ({ ...state, case: data }));
  },

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

  getAll: async (
    retail_id: string,
    applicant_rut: string,
    applicant_name: string,
    stage_id: string
  ) => {
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

      set((state) => ({
        ...state,
        case: data,
        caseId: data,
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

  getApplicantByRut: async (rut: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));

      const { data } = await apiInstance.get(`/case/getApplicantByRut/${rut}`);

      const { type, retail, customer, insured, beneficiary, products } = data;

      set((state) => ({
        ...state,
        products,
        case: { ...state.case, type, retail, customer, insured, beneficiary },
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

  getServicesAndValues: async (data: ICaseServices) => {
    try {
      set((state) => ({ ...state, isLoading: true }));

      const { data: response } = await apiInstance.post(
        `/case/getServicesAndValues`,
        data
      );

      const { lead_id, assistances, assistance, values } = response;

      set((state) => ({
        ...state,
        assistances,
        case: {
          ...state.case,
          lead_id,
          values,
          assistance: assistance || state.case.assistance,
        },
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

  upsert: async (data: ICase) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      console.log(data);
      const { data: response } = await apiInstance.post(`/case/upsert`, data);
      console.log(response, data);
      set((state) => ({ ...state, case: response, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },

  resetNoRut: (applicantCode: "insured" | "beneficiary", rut: string) => {
    set((state) => ({
      ...state,
      case: {
        ...initialCase,
        [applicantCode]: { ...initialCase[applicantCode], rut },
      },
    }));
  },

  reset: () => {
    set((state) => ({
      ...state,
      case: initialCase,
    }));
  },
}));
