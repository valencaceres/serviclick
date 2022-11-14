import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TransientIdentifier } from "typescript";

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

type FrequencyT = "M" | "A" | "S";

export type ProductT = {
  id: string;
  price: number;
  currency_code: string;
  frequency_code: FrequencyT;
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
      frequency_code: "M",
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
};

export const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setAgentId: (state: StateT, action: PayloadAction<string>) => {
      state.lead.agent_id = action.payload;
    },
    setLeadList: (state: StateT, action: PayloadAction<LeadT[]>) => {
      state.list = action.payload;
    },
    setLead: (state: StateT, action: PayloadAction<LeadT>) => {
      state.lead = action.payload;
      state.loading = false;
    },
    setLeadProduct: (state: StateT, action: PayloadAction<ProductT>) => {
      state.lead = { ...state.lead, product: action.payload };
    },
    setLeadCustomer: (state: StateT, action: PayloadAction<CustomerT>) => {
      state.lead = { ...state.lead, customer: action.payload };
    },
    setLeadCompany: (state: StateT, action: PayloadAction<CompanyT>) => {
      state.lead = { ...state.lead, company: action.payload };
    },
    setLeadInsured: (state: StateT, action: PayloadAction<InsuredT[]>) => {
      state.lead = { ...state.lead, insured: action.payload };
    },
    addLeadInsured: (state: StateT, action: PayloadAction<InsuredT>) => {
      state.lead = {
        ...state.lead,
        insured: [...state.lead.insured, action.payload],
      };
    },
    setLeadSubscription: (
      state: StateT,
      action: PayloadAction<SubscriptionT>
    ) => {
      state.lead = { ...state.lead, subscription: action.payload };
    },
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
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
  setAgentId,
  setLeadList,
  setLead,
  setLeadProduct,
  setLeadCustomer,
  setLeadCompany,
  setLeadInsured,
  setLoading,
  addLeadInsured,
  setLeadSubscription,
  resetLeadSubscription,
  resetLead,
} = leadSlice.actions;

export default leadSlice.reducer;

export const createLead =
  (lead: LeadT, send: boolean, subscription: boolean) =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`/lead/create`, {
      ...lead,
      send,
      subscription,
    });
    dispatch(setLead(data));
  };
