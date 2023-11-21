import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import {
  reimbursmentResponse,
  DocumentInfo,
} from "../../interfaces/reimbursment";
interface userState {
  list: reimbursmentResponse;
  documents: DocumentInfo[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  getAll: (
    isImed: boolean,
    applicant_rut: string,
    applicant_name: string,
    records: number,
    page: number
  ) => void;
  getAttachByCase: (id: string) => void;
  updateReimbursment: (
    id: string,
    body: any,
    options?: { onSuccess?: () => void }
  ) => Promise<void>;
  reset: () => void;
  resetAll: () => void;
}

const initialData: reimbursmentResponse = {
  data: [],
  pagination: {
    page: 0,
    records: 0,
    total: 0,
  },
  summary: {
    cases: 0,
  },
};

export const reimbursmentStore = create<userState>((set, get) => ({
  list: initialData,
  documents: [],
  isLoading: false,
  isError: false,
  error: "",

  set: (reimbursment: reimbursmentResponse) => {
    set((state) => ({ ...state, reimbursment }));
  },

  getAll: async (
    isImed: boolean,
    applicant_rut: string,
    applicant_name: string,
    records: number,
    page: number
  ) => {
    try {
      set((state) => ({ ...state, isLoading: true }));

      const params = {
        isImed,
        applicant_rut: applicant_rut,
        applicant_name: applicant_name,
        records,
        page,
      };

      const queryParams = Object.entries(params)
        .filter(([_, value]) => value !== "")
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const url = `/case/getReimbursments${
        queryParams ? `?${queryParams}` : ""
      }`;
      const { data } = await apiInstance.get(url);
      set((state) => ({ ...state, list: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  getAttachByCase: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`case/getAttachByIdAdmin/${id}`);
      set((state) => ({
        ...state,
        documents: data,
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
  updateReimbursment: async (
    id: string,
    body: any,
    options?: { onSuccess?: () => void }
  ) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.put(
        `case/updateReimbursment/${id}`,
        body
      );
      set((state) => ({
        ...state,
        isLoading: false,
        isError: false,
      }));

      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  reset: () =>
    set((state) => ({
      ...state,
      retail: initialData,
      isLoading: false,
      isError: false,
      error: "",
    })),
  resetAll: () => set({}, true),
}));
