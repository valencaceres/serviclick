import { create } from "zustand";

import { apiInstance } from "../../utils/api";
import { User } from "@clerk/nextjs/dist/types/server";
import {
  ICase,
  ICaseItem,
  IRetailItem,
  IStatusItem,
  IProduct,
  IAssistance,
  IRetail,
  IChatMessage,
} from "../../interfaces/case";
import { IApplicant } from "~/interfaces/applicant";
import axios from "axios";

interface UserResponse {
  data: { id: string; first_name: string; last_name: string }[];
}
interface ICaseServices {
  insured_id: string | null;
  beneficiary_id: string | null;
  retail_id: string | null;
  customer_id: string | null;
  product_id: string;
  assistance_id: string | null;
}
interface UFPrice {
  uf: string;
  today: Date;
}

interface caseState {
  products: IProduct[] | null;
  assistances: IAssistance[] | null;
  applicant: IApplicant;
  pdfBase64: string;
  retails: IRetail[];
  case: ICase;
  usersList: UserResponse;
  usersListChat: UserResponse;
  caseId: ICase;
  caseList: {
    summary: {
      cases: number;
    };
    pagination: {
      total: number;
      page: number;
      records: number;
    };
    data: ICaseItem[];
  };
  ufValue: UFPrice;
  retailList: IRetailItem[];
  statusList: IStatusItem[];
  chatMessage: IChatMessage;
  chatMessages: IChatMessage[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  setCase: (data: ICase) => void;
  getApplicantByRut: (
    rut: string,
    typeApplicant: string,
    caseValue: ICase | null
  ) => void;
  getUsers: (ids: string[]) => void;
  getUsersChat: (ids: string[]) => void;
  getRetails: () => void;
  getStatus: () => void;
  getAll: (
    retail_id: string,
    applicant_rut: string,
    applicant_name: string,
    stage_id: string,
    records: number,
    page: number
  ) => void;
  getUfValue: () => void;
  getById: (id: string) => void;
  getServicesAndValues: (data: ICaseServices) => void;
  upsert: (data: ICase) => void;
  getPdfContract: (product_plan_id: string) => void;
  upsertApplicant: (
    type: string,
    data: IApplicant,
    caseValue: ICase | null,
    applicantToUpdate: string
  ) => void;
  getContract: (case_id: string) => void,
  resetNoRut: (
    applicantCode: "insured" | "beneficiary",
    rut: string,
    isInsured: boolean
  ) => void;
  reset: () => void;
  resetApplicant: () => void;
  resetCaseId: () => void;
  resetPdf: () => void;
  resetUserLists: () => void;
  resetUserListsChat: () => void;
  createChatMessage: (messageData: any) => void;
  getChatByCase: (case_id: string) => void;
  resetPdfBase64: () => void
}

const initialCase: ICase = {
  case_id: null,
  case_number: 0,
  user_id: "",
  date: "",
  time: "",
  type: "C",
  lead_id: "",
  policy: {
    id: null,
    startDate: "",
    endDate: "",
  },
  retail: null,
  customer: {
    id: null,
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
    productPlan_id: "",
    agent_id: "",
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
  values: null || [],
  event: null,
  files: null,
  procedure_id: null,
  refund: null,
  specialist: null,
  alliance: null,
  cost: null,
  history: [],
  status: {
    isClosed: false,
    description: "",
  },
  productplan_id: null,
  chatMessages: [],
  chatMessage: {} as IChatMessage,
};


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

const initialChatMessage: IChatMessage = {
  applicant_lastname: "",
  applicant_name: "",
  case_id: "",
  created_at: "",
  id: "",
  message: "",
  stage_id: "",
  type: "",
  user_id: "",
}

export const caseStore = create<caseState>((set) => ({
  products: [],
  assistances: [],
  retails: [],
  ufValue: {
    uf: "",
    today: new Date(),
  },
  usersList: {
    data: [],
  },
  usersListChat: {
    data: [],
  },
  chatMessage: initialChatMessage,
  chatMessages: [],
  pdfBase64: "",
  caseId: initialCase,
  case: initialCase,
  applicant: initialApplicant,
  caseList: {
    summary: {
      cases: 0,
    },
    pagination: {
      total: 0,
      page: 0,
      records: 0,
    },
    data: [],
  },
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
      const { data } = await apiInstance.get(`/case/getOrigins`);
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
    stage_id: string,
    records: number,
    page: number
  ) => {
    try {
      set((state) => ({ ...state, isLoading: true }));

      const params = {
        retail_id: retail_id,
        applicant_rut: applicant_rut,
        applicant_name: applicant_name,
        stage_id: stage_id,
        records,
        page,
      };

      const queryParams = Object.entries(params)
        .filter(([_, value]) => value !== "")
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const url = `/case/getAll${queryParams ? `?${queryParams}` : ""}`;
      const { data } = await apiInstance.get(url);

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
  getUsers: async (ids: string[]) => {
    try {
      set((state) => ({ ...state, isLoading: true }));

      const { data } = await apiInstance.post(`/user/getByIds`, { ids });

      set((state) => ({
        ...state,
        usersList: data,
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
  getUsersChat: async (ids: string[]) => {
    try {
      set((state) => ({ ...state, isLoading: true }));

      const { data } = await apiInstance.post(`/user/getByIds`, { ids });

      set((state) => ({
        ...state,
        usersListChat: data,
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

  getApplicantByRut: async (
    rut: string,
    typeApplicant: string,
    caseValue: ICase | null
  ) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/case/getApplicantByRut/${rut}`);
      
      const {
        type,
        retails,
        customer: existingCustomer,
        insured,
        beneficiary,
        products,
      } = data;

      let customer = existingCustomer || {};

      if (!customer.id) {
        customer.id = insured.id || null;
        customer.name = insured.name || "";
        customer.rut = insured.rut || "";
      }

      if (caseValue && caseValue.customer && caseValue.customer.id) {
        customer = caseValue.customer;
      }

      const shouldUpdateBeneficiary =
        (type !== "C" && typeApplicant === "C") ||
        caseValue?.beneficiary?.name === null ||
        caseValue?.beneficiary?.name === "";
      const shouldUpdateCustomer =
        caseValue &&
        caseValue.beneficiary !== null &&
        caseValue?.beneficiary.name !== "";
      const shouldUpdateCustomerId =
        caseValue && caseValue.type === "C" && caseValue.insured.name === "";
      const updatedCustomerId = shouldUpdateCustomerId
        ? customer?.id
        : caseValue?.customer?.id;

      const shouldUpdateType =
        caseValue &&
        caseValue.beneficiary === null &&
        type !== "";

      set((state) => ({
        ...state,
        products,
        retails,
        case: {
          ...state.case,
          type: shouldUpdateType ? type : "C",
          customer: {
            id: updatedCustomerId,
            name: shouldUpdateCustomer
              ? caseValue?.customer?.name
              : customer?.name,
            rut: shouldUpdateCustomer
              ? caseValue?.customer?.rut
              : customer?.rut,
          },
          insured,
          beneficiary: shouldUpdateBeneficiary
            ? beneficiary
            : caseValue?.beneficiary,
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
  getPdfContract: async (product_plan_id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(
        `/product/getContract/${product_plan_id}`
      );
      set((state) => ({ ...state, pdfBase64: data?.base64, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  getContract: async (product_id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/product/getContractOperations/${product_id}`);
      console.log('Se dispara getContract en el store')
      set((state) => {
        if (state.pdfBase64 !== data.data) {
          return { ...state, pdfBase64: data.data, isLoading: false };
        }
        return { ...state, isLoading: false };
      });
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
      const { data: response } = await apiInstance.post(`/case/upsert`, data);
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
  getUfValue: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await axios.get(`https://api.santa.cl/uf`);
      set((state) => ({ ...state, ufValue: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  upsertApplicant: async (
    type: string,
    data: IApplicant,
    caseValue: ICase | null,
    applicantToUpdate: string
  ) => {
    try {
      set((state) => ({ ...state, isLoading: true }));

      const update =
        type === "C"
          ? data.type === "I"
            ? "insured"
            : "beneficiary"
          : type === "I"
          ? "insured"
          : type === "B"
          ? "beneficiary"
          : null;

      const shouldUpdateCustomer =
        caseValue !== null &&
        caseValue.type === "C" &&
        ((caseValue.insured !== null &&
          typeof caseValue.insured === "object" &&
          caseValue.insured.name !== "" &&
          (caseValue.beneficiary === null ||
            (typeof caseValue.beneficiary === "object" &&
              (Object.keys(caseValue.beneficiary).length === 0 ||
                caseValue.beneficiary.name === "")))) ||
          (caseValue.beneficiary !== null &&
            typeof caseValue.beneficiary === "object" &&
            caseValue.beneficiary.name !== "" &&
            (caseValue.insured === null ||
              (typeof caseValue.insured === "object" &&
                (Object.keys(caseValue.insured).length === 0 ||
                  caseValue.insured.name === "")))));

      const shouldUpdateIdCustomer =
        caseValue !== null &&
        caseValue.type === "C" &&
        (caseValue.beneficiary === null ||
          (caseValue.beneficiary !== null && caseValue.beneficiary.rut === ""));
      const response = await apiInstance.post(`/${update}/upsert`, data);

      set((state) => ({
        ...state,
        case: {
          ...state.case,
          ...(shouldUpdateCustomer
            ? {
                customer: {
                  id: shouldUpdateIdCustomer ? response?.data?.id : null,
                  name: response?.data?.name,
                  rut: response?.data?.rut,
                },
              }
            : {}),
          [applicantToUpdate]: response?.data,
        },

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

  resetNoRut: (
    applicantCode: "insured" | "beneficiary",
    rut: string,
    isInsured: boolean
  ) => {
    set((state) => ({
      ...state,
      case: isInsured
        ? {
            ...state.case,
            [applicantCode]: { ...initialCase[applicantCode], rut },
          }
        : {
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
  resetCaseId: () => {
    set((state) => ({
      ...state,
      caseId: initialCase,
    }));
  },
  resetApplicant: () => {
    set((state) => ({
      ...state,
      applicant: initialApplicant,
    }));
  },
  resetPdf: () => {
    set((state) => ({
      ...state,
      pdfBase64: "",
    }));
  },
  resetUserLists: () => {
    set((state) => ({
      ...state,
      usersList: {
        data: [],
      },
    }));
  },
  resetUserListsChat: () => {
    set((state) => ({
      ...state,
      usersListChat: {
        data: [],
      },
    }));
  },
  getChatByCase: async (case_id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      console.log('Se dispara getChat en el store')
        console.log(case_id)
        const { data } = await apiInstance.get(`/case/getChatByCase/${case_id}`);
        const sortedData = data.sort((a: any, b: any) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        console.log(sortedData)
        set((state) => ({ ...state, chatMessages: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  createChatMessage: async (messageData: any) => {
    try {
      set((state) => ({ ...state, isLoading: true })); 
      const { case_id, stage_id, user_id, message, type } = messageData
      const response = await apiInstance.post(
        `/case/createChatMessage`,
        { case_id, stage_id, user_id, message, type }
      );
      console.log('Response:', response);
      set((state) => ({
        ...state,
        chatMessages: [...state.chatMessages, response.data].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
        isLoading: false
      }));
    } catch (e) {
      console.error('Error in createChatMessage:', e);
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  resetPdfBase64: () => {
    set((state) => ({
      ...state,
      pdfBase64: '',
    }));
  },
}));
