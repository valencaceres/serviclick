import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export type CustomerT = {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  birthDate: string;
  address: string;
  district: string;
  email: string;
  phone: string;
};

export type CompanyT = {
  id: string;
  rut: string;
  companyName: string;
  legalRepresentative: string;
  line: string;
  address: string;
  district: string;
  email: string;
  phone: string;
};

export type ProductT = {
  id: string;
  price: number;
  currency_code: string;
  frequency_code: string;
  productPlan_id: number;
};

type BeneficiaryT = {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  birthDate: string;
  address: string;
  district: string;
  email: string;
  phone: string;
};

export type InsuredT = {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  birthDate: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  beneficiaries: BeneficiaryT[];
};

type SubscriptionT = {
  id: number;
  completion_url: string;
  security_token: string;
  status_code: number;
};

export type LeadT = {
  id: string;
  date: string;
  customer: CustomerT;
  company: CompanyT;
  product: ProductT;
  insured: InsuredT[];
  subscription: SubscriptionT;
  agent_id: string;
  isActive: boolean;
};

type StateT = {
  list: LeadT[];
  lead: LeadT;
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  lead: {
    id: "",
    date: "",
    customer: {
      id: "",
      rut: "",
      name: "",
      paternalLastName: "",
      maternalLastName: "",
      birthDate: "",
      address: "",
      district: "",
      email: "",
      phone: "",
    },
    company: {
      id: "",
      rut: "",
      companyName: "",
      legalRepresentative: "",
      line: "",
      address: "",
      district: "",
      email: "",
      phone: "",
    },
    product: {
      id: "",
      price: 0,
      currency_code: "",
      frequency_code: "",
      productPlan_id: 0,
    },
    insured: [],
    subscription: {
      id: 0,
      completion_url: "",
      security_token: "",
      status_code: 0,
    },
    agent_id: "",
    isActive: false,
  },
  loading: false,
  error: false,
};

export const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLeadList: (state: StateT, action: PayloadAction<LeadT[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setLead: (state: StateT, action: PayloadAction<LeadT>) => {
      state.lead = action.payload;
      state.loading = false;
      state.error = false;
    },
    setLeadAgent: (state: StateT, action: PayloadAction<string>) => {
      state.lead.agent_id = action.payload;
      state.loading = false;
      state.error = false;
    },
    setLeadProduct: (state: StateT, action: PayloadAction<ProductT>) => {
      state.lead = { ...state.lead, product: action.payload };
      state.loading = false;
      state.error = false;
    },
    setLeadCustomer: (state: StateT, action: PayloadAction<CustomerT>) => {
      state.lead = { ...state.lead, customer: action.payload };
      state.loading = false;
      state.error = false;
    },
    setLeadCompany: (state: StateT, action: PayloadAction<CompanyT>) => {
      state.lead = { ...state.lead, company: action.payload };
      state.loading = false;
      state.error = false;
    },
    setLeadInsured: (state: StateT, action: PayloadAction<InsuredT[]>) => {
      state.lead = { ...state.lead, insured: action.payload };
      state.loading = false;
      state.error = false;
    },
    setLeadSubscription: (
      state: StateT,
      action: PayloadAction<SubscriptionT>
    ) => {
      state.lead = { ...state.lead, subscription: action.payload };
      state.loading = false;
      state.error = false;
    },
    resetLeadSubscription: (state: StateT) => {
      state.lead.subscription = initialState.lead.subscription;
    },
    resetLead: (state: StateT) => {
      state.lead = initialState.lead;
    },
  },
});

export const {
  setLoading,
  setError,
  setLeadList,
  setLead,
  setLeadAgent,
  setLeadProduct,
  setLeadCustomer,
  setLeadCompany,
  setLeadInsured,
  setLeadSubscription,
  resetLeadSubscription,
  resetLead,
} = leadSlice.actions;

export default leadSlice.reducer;

export const getLeadById = (leadId: string) => async (dispatch: any) => {
  dispatch(setLoading(true));
  const { data } = await apiInstance.get(`/lead/getById/${leadId}`);
  dispatch(setLead(data));
};

export const getLeadBySubscriptionId =
  (subscriptionId: number) => async (dispatch: any) => {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(
      `/lead/getBySubscriptionId/${subscriptionId}`
    );
    dispatch(setLead(data));
  };

export const createLead =
  (lead: LeadT, send: boolean, subscription: boolean) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const resolveData = await apiInstance.post(`/lead/create`, {
        ...lead,
        send,
        subscription,
      });
      dispatch(setLead(resolveData.data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const updateLead =
  (id: string, name: string, isBroker: boolean) => async (dispatch: any) => {
    dispatch(setLoading(true));
    const { data } = await apiInstance.put(`/lead/update/${id}`, {
      name,
      isBroker,
    });
    dispatch(setLead(data));
  };

export const deleteLead = (id: string) => async (dispatch: any) => {
  dispatch(setLoading(true));
  const { data } = await apiInstance.delete(`/lead/delete/${id}`);
  dispatch(resetLead());
};

export const createSubscription =
  (
    plan_id: number,
    email: string,
    name: string,
    amount: number,
    address: string,
    rut: string,
    phone: string
  ) =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`/lead/createSubscription`, {
      plan_id,
      email,
      name,
      amount,
      address,
      rut,
      phone,
    });
    dispatch(setLeadSubscription(data));
  };
