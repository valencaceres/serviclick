import { create } from "zustand";
 import { TransactionT } from "~/interfaces/transaction";
import { apiInstance } from "../../utils/api";




interface transactionStore {
  transaction: TransactionT;
  isLoading: boolean;
  isError: boolean;
  error: string;
  getTransactionById: (id: string) => void;
  resetTransaction: () => void;
  updateAmount: (amount: number, id:number) => void;  
  updateDate: (date: string, id:number) => void;
  updateStatus: (isdeactivated:boolean, id:number) => void;
  changeMethod: ( id:number) => void;
}

export const transactionStore = create<transactionStore>((set) => ({
  transaction: {
    product_name: "",
    created_on: "",
    cron: [], 
    customer: {
      rut: "",
      name: "",
      paternallastname: "",
      maternallastname: "",
      address: "",
      district: "",
      email: "",
      phone: "",
    },
    frequency: "",
    id: 0,
    last_payment: "",
    lead_id: "",
    next_due_date: "",
    payment: [],
    payment_method: {
      code: "",
      last_4_card_digits: "",
      payment_method_type: "", }
      ,
    paymentsArray: [],
    plan_id: 0,
    product_id: "",
    status_id: 0,
    status_name: "",
    total_successful_payments: 0,
    plan_amount: 0,
    is_uf: false,
  },
  isLoading: false,
  isError: false,
  error: "",
 
  getTransactionById: async (id: string) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } = await apiInstance.get(`/transaction/getBySubscriptionId/${id}`);
      set((state) => ({ ...state, transaction: data, isLoading: false }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  updateAmount: async (amount: number, id: number) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } =  await apiInstance.post(`/transaction/changeAmount`, { id, amount });
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
  updateDate: async (date: string, id: number) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } =  await apiInstance.post(`/transaction/changeDate`, { id, date });
      console.log(data, "data")
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
  updateStatus: async (isdeactivated: boolean, id: number) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } =  await apiInstance.post(`/transaction/changeStatus`, { id, isdeactivated });
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
  changeMethod: async (id: number) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      const { data } =  await apiInstance.post(`/transaction/changeMethod`, { id });
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


  resetTransaction: () => {
    set((state) => ({
      ...state,
      transaction: {
        product_name: "",
        created_on: "",
        cron: [], 
        customer: {
          rut: "",
          name: "",
          paternallastname: "",
          maternallastname: "",
          address: "",
          district: "",
          email: "",
          phone: "",
        },
        frequency: "",
        id: 0,
        last_payment: "",
        lead_id: "",
        next_due_date: "",
        payment: [],
        is_uf: false,
        plan_amount:0,
        payment_method: {
          code: "",
          last_4_card_digits: "",
          payment_method_type: "", }
          ,
        paymentsArray: [],
        plan_id: 0,
        product_id: "",
        status_id: 0,
        status_name: "",
        total_successful_payments: 0,
    
      },
    }));
  },
}));
