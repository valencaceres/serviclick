import { create } from "zustand";
import { insuredStore } from "./insuredStore";
import { apiInstance } from "../../utils/api";
 export interface IBeneficiary {
    address: string;
    birthDate: string;
    district: string;
    email: string;
    id: string;
    maternalLastName: string;
    name: string;
    paternalLastName: string;
    phone: string;
    relationship: string;
    rut: string;
  }

interface beneficiaryState {
  isLoading: boolean;
  isError: boolean;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  upsertBeneficiary: (data: IBeneficiary) => void;
  removeLeadBeneficiary: (  insured_id: string, beneficiary_id:string, subscription_id:string ) => void;
}



export const beneficiaryStore = create<beneficiaryState>((set, get) => ({
  beneficiaryList: [],
  isLoading: false,
  isError: false,
  error: "",

  setIsLoading: (isLoading: boolean) => {
    set((state) => ({ ...state, isLoading }));
  },

  setIsError: (isError: boolean) => {
    set((state) => ({ ...state, isError }));
  },



  upsertBeneficiary: async (data: IBeneficiary) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const response = await apiInstance.post(`/beneficiary/upsert`, data);
      
      insuredStore.setState((insuredStore) => ({
        ...insuredStore,
        beneficiaryList: insuredStore.beneficiaryList.map((beneficiary) =>
          beneficiary.id === response?.data.id ? response?.data : beneficiary
        ),
      }));

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
  removeLeadBeneficiary: async (  insured_id: string, beneficiary_id:string, subscription_id:string ) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));
      const response = await apiInstance.delete(`lead/removeBeneficiary`, {data: {insured_id, beneficiary_id, subscription_id}});

      insuredStore.setState((insuredStore) => ({
        ...insuredStore,
        beneficiaryList: insuredStore.beneficiaryList.filter((beneficiary) => beneficiary.id !== response?.data.beneficiary_id),
      }));

      set((state) => ({ ...state, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  }


}));
