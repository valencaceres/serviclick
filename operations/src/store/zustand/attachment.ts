import { create } from "zustand";

import { apiInstance } from "../../utils/api";
import { IAssistanceItem } from "~/interfaces/case";
interface DocumentType {
    id: string;
    name: string;
  }

  interface DocumentLink {
    document_id: string;
    viewLink: string;
    file_tag: string;
  }
interface attachmentStore {
  attachment: DocumentType[];
  attach: DocumentLink[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  getDocumentsById: (id: string) => void;
  getAttachByiD: (case_id: string, casestage: string) => void;
  resetAttach: () => void;
  resetDocuments: () => void;
}



export const attachmentStore = create<attachmentStore>((set) => ({
  attachment: [

  ],
  attach: [ ], 
  isLoading: false,
  isError: false,
  error: "",

  getDocumentsById: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/assistance/getDocumentsById/${id}`);
      set((state) => ({ ...state, attachment: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
getAttachByiD: async (case_id: string, casestage: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/case/getAttachById/${case_id}/${casestage}`);
      set((state) => ({ ...state, attach: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  resetAttach: () => {
    set((state) => ({ ...state, attach: [] }));
  },
    resetDocuments: () => {
        set((state) => ({ ...state, attachment: [] }));
    },
}));
