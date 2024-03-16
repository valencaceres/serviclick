import { create } from "zustand";

import { apiInstance } from "../../utils/api";
interface Product {
  product_id: string;
  name: string;
  beneficiaries: number;
  promotional: string;
  beneficiary_price: number | null;
  productPlan_id: {
    customer_plan_id: number;
    yearly_plan_id: number;
  };
  price: {
    base: number | null;
    customer: number;
    yearlyprice: number | null;
    company: number | null;
  };
  discount: {
    type: string;
    percent: number;
    cicles: number;
  };
  pdfbase64: string | null;
}

interface AgentProductResponse {
  agent: {
    id: string;
    channel_id: string;
    name: string;
    fantasyname: string;
  };
  products: Product[];
}

interface agentStore {
  agent: AgentProductResponse;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getAgentById: (id: string) => void;
  setAgent: (agent: AgentProductResponse) => void;
  resetAgent: () => void;
  addProduct:(id:string, product: Product) => void;
  removeProduct:(id:string, product_id:string) => void;
  
}

export const agentStore = create<agentStore>((set) => ({
  agent: {
    agent: { id: "", channel_id: "", name: "", fantasyname: "" },
    products: [],
  },
  isLoading: false,
  isError: false,
  error: "",
  setAgent: (data: AgentProductResponse) => {
    set((state) => ({ ...state, agent: data }));
  },
  getAgentById: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/agent/getDataById/${id}`);
      set((state) => ({ ...state, agent: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  addProduct: async (id:string, product: Product) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data: response } = await apiInstance.post(`/agent/addProduct`,{id, product});
      set((state) => ({ ...state,   agent: {
        ...state.agent,
        products: response
    }, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  removeProduct: async (id:string, product_id:string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data: response } = await apiInstance.delete(`/agent/removeProduct/${product_id}`);
      set((state) => ({ ...state,  isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },



  resetAgent: () => {
    set((state) => ({
      ...state,
      agent: {
        agent: { id: "", channel_id: "", name: "", fantasyname: "" },
        products: [],
      },
    }));
  },
}));
