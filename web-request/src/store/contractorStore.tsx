import { create } from "zustand";

import { apiInstance } from "../utils/api";

import { IContractor, ICustomerEndpoint } from "@/interfaces/contractor";

interface ContractorState {
  contractor: IContractor;
  customer: ICustomerEndpoint
  contractorList: IContractor[];
  isLoading: boolean;
  isError: boolean;
  getByRutOrName: (rut: string) => void;
  getContractorById: (id: string) => void
  reset: () => void
}

const initialDataContractor: IContractor = {
    customer: {
        id: '',
        name: '',
        rut: '',
        paternallastname: '',
        maternallastname: '',
        address: '',
        district: '',
        email: '',
        phone: ''
    },
    type: '',
    origins: [{
        subscription_id: '',
        type: '',
        lead_user: '',
        name: '',
        product: {
            id: '',
            name: '',
            assistances: []
        },
        insured: {
            id: '',
            name: '',
            rut: '',
            paternallastname: '',
            maternallastname: '',
            address: '',
            district: '',
            email: '',
            phone: ''
        },
        beneficiaries: [],
        price: {
            value: 0,
            frequency: ''
        },
        dates: {
            purchase: '',
            init: '',
            end: ''
        },
        balance: []
    }]
  }

const initialDataCustomer: ICustomerEndpoint = {
    summary: {
        customer: 0,
        products: 0
    },
    pagination: {
        total: 0,
        page: 0,
        records: 0
    },
    data: [{
        id: '',
        rut: '',
        name: '',
        products: 0
    }]
}

export const contractorContractor = create<ContractorState>((set) => ({
  contractor: initialDataContractor,
  customer: initialDataCustomer,
  contractorList: [],
  isLoading: true,
  isError: false,

  getByRutOrName: async (rut: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`customer/getByRutOrName?rut=${rut}`);
      console.log('%cweb-request\src\store\contractorStore.tsx:101 data', 'color: #007acc;', data);
      set((state) => ({
        ...state,
        customer: data,
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

  getContractorById: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));

      const { data } = await apiInstance.get(`contractor/getCustomerById/${id}`);
      
      set((state) => ({
        ...state,
        contractor: data,
        product: data.origins[0],
        beneficiaryList: data.origins[0].beneficiaries || [],
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

  reset: () =>
    set((state) => ({
      ...state,
      customer: initialDataCustomer,
      contractor: initialDataContractor,
      isLoading: false,
      isError: false,
      error: "",
    })),
}));
