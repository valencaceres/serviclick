import { create } from "zustand";

import { apiInstance } from "../../utils/api";

import { ICustomer, ICustomerItem, IContractorData, Origin } from "../../interfaces/customer";

interface customerState {
  list: {
    summary: {
      customer: number;
      products: number;
    };
    pagination: {
      total: number;
      page: number;
      records: number;
    };
    data: ICustomerItem[];
  };
  product: Origin
  contractor: IContractorData
  customer: ICustomer;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getByRutOrName: (
    rut: string | null,
    name: string | null,
    records: number | null,
    page: number | null
  ) => void;
  getContractorById: (id: string) => void;
  selectProduct: (product: Origin) => void;
  reset: () => void;
  resetAll: () => void;
  resetContractor: () => void;

}

const initialData: ICustomer = {
  id: "",
  rut: "",
  name: "",
  legalrepresentative: "",
  line: "",
  address: "",
  district: "",
  email: "",
  phone: "",
  specialties: [],
};

const initialContractorData: IContractorData = {
  customer: {
    id: "",
    rut: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    address: "",
    district: "",
    email: "",
    phone: "",
  },
  origins: [
    {
      subscription_id: 0,
      type: "",
      name: "",
      lead_user:  "",

      product: {
        id: "",
        name: "",
        assistances: [],
      },
      insured: {
        id: "",
        rut: "",
        name: "",
        paternalLastName: "",
        maternalLastName: "",
        address: "",
        district: "",
        email: "",
        phone: "",
      },
      beneficiaries: null,
      price: {
        value: 0,
        frequency: "",
      },
      dates: {
        purchase: "",
        init: "",
        end: null,
      },
      balance: null,
    },
  ],
  type: "P",
};
const Product: Origin = {
  subscription_id: 0,
  type: "",
  name: "",
  lead_user: "",

  product: {
    id: "",
    name: "",
    assistances: [],
  },
  insured: {
    id: "",
    rut: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    address: "",
    district: "",
    email: "",
    phone: "",
  },
  beneficiaries: null,
  price: {
    value: 0,
    frequency: "",
  },
  dates: {
    purchase: "",
    init: "",
    end: null,
  },
  balance: null,
};

export const customerStore = create<customerState>((set, get) => ({
  list: {
    summary: {
      customer: 0,
      products: 0,
    },
    pagination: {
      total: 0,
      page: 0,
      records: 0,
    },
    data: [],
  },
  product: Product,
  customer: initialData,
  contractor: initialContractorData,
  isLoading: false,
  isError: false,
  error: "",

  getByRutOrName: async (
    rut: string | null,
    name: string | null,
    records: number | null,
    page: number | null
  ) => {
    try {
      let url = "";

      set((state) => ({ ...state, isLoading: true }));

      if (rut) {
        url += `?rut=${rut}`;
      }

      if (name) {
        url += rut ? "&" : "?";
        url += `name=${name}`;
      }

      if (records) {
        url += rut || name ? "&" : "?";
        url += `records=${records}`;
      }

      if (page) {
        url += rut || name || records ? "&" : "?";
        url += `page=${page}`;
      }

      const { data } = await apiInstance.get(`customer/getByRutOrName${url}`);
      set((state) => ({
        ...state,
        list: data,
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
  selectProduct: (product: Origin) =>
    set((state) => ({ ...state, product: product })),

  reset: () =>
    set((state) => ({
      ...state,
      customer: initialData,
      isLoading: false,
      isError: false,
      error: "",
    })),

  resetAll: () => set({}, true),
  resetContractor: () =>
  set((state) => ({
    ...state,
    contractor: initialContractorData,
    isLoading: false,
    isError: false,
    error: "",
  })),
}));
