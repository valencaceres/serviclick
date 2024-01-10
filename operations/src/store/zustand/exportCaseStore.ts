import { create } from "zustand";

import { apiInstance } from "../../utils/api";
import {
  ICase,
  ICaseItem,

} from "../../interfaces/case";


interface CaseDate {
    month: string;
    year: string;
  }
  type OnSuccessCallback = (data: any) => void;

interface caseState {

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
  excel: any;
  retailList: [];
 caseDates: CaseDate[];
 caseEventDates: CaseDate[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  setCase: (data: ICase) => void;

 getRetails: () => void;
 getCaseDates: () => void;
  getAll: (
    retail_id: string,
    case_date: string,
    event_date: string,
    records: number,
    page: number
  ) => void;
  exportCases: (
    retail_id: string,
    case_date: string,
    event_date: string,
    records: number,
    page: number,
    onSuccess?: OnSuccessCallback
  ) => void;
  resetExcel:()=> void;
}





export const caseExportStore = create<caseState>((set) => ({
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
  excel: null,
  caseEventDates: [],
  caseDates:[],
  retailList: [],
 
  isLoading: false,
  isError: false,
  error: "",

  setCase: (data: ICase) => {
    set((state) => ({ ...state, case: data }));
  },
  exportCases: async (
    retail_id: string,
    case_date: string,
    event_date: string,
    records: number,
    page: number,
  ) => {
    try {
      set((state) => ({ ...state, isLoading: true }));

      const formattedCaseDate = case_date
        ? `${new Date(case_date).getFullYear()}-${(new Date(case_date).getMonth() + 1)
            .toString()
            .padStart(2, "0")}`
        : "";

      const formattedEventDate = event_date
        ? `${new Date(event_date).getFullYear()}-${(new Date(event_date).getMonth() + 1)
            .toString()
            .padStart(2, "0")}`
        : "";

      const params = {
        retail_id: retail_id,
        case_date: formattedCaseDate,
        event_date: formattedEventDate,
        records,
        page,
      };

      const queryParams = Object.entries(params)
        .filter(([_, value]) => value !== "")
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

        const url = `/case/exportCases${queryParams ? `?${queryParams}` : ""}`;
        const response = await apiInstance.get(url, { responseType: 'arraybuffer' });
       
if (response && response.data && response.data.byteLength > 0) {
  const byteArray = new Uint8Array(response.data);
  const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'casos.xlsx';

  link.click();
}
      set((state) => ({ ...state, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
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


  getAll: async (
    retail_id: string,
    case_date: string,
    event_date: string,
    records: number,
    page: number
  ) => {
    try {
      set((state) => ({ ...state, isLoading: true }));

      const formattedCaseDate = case_date
      ? `${new Date(case_date).getFullYear()}-${(new Date(case_date).getMonth() + 1)
          .toString()
          .padStart(2, "0")}`
      : "";

    const formattedEventDate = event_date
      ? `${new Date(event_date).getFullYear()}-${(new Date(event_date).getMonth() + 1)
          .toString()
          .padStart(2, "0")}`
      : "";

    const params = {
      retail_id: retail_id,
      case_date: formattedCaseDate,
      event_date: formattedEventDate,
      records,
      page,
    };
      const queryParams = Object.entries(params)
        .filter(([_, value]) => value !== "")
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const url = `/case/getAllExports${queryParams ? `?${queryParams}` : ""}`;
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
  
  getCaseDates: async () => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/case/getAllCaseDates`);
     
      set((state) => ({ ...state, caseDates:data?.createdDates, caseEventDates:data?.eventDates, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
 
  resetExcel: () => {
    set((state) => ({
      ...state,
      excel: null
  }));
  },

}));
