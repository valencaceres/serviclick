import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";

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

type LeadT = {
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
};

export const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setLeadList: (state: StateT, action: PayloadAction<LeadT[]>) => {
      state.list = action.payload;
    },
    setLead: (state: StateT, action: PayloadAction<LeadT>) => {
      state.lead = action.payload;
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
    resetLeadSubscription: (state: StateT) => {
      state.lead.subscription = initialState.lead.subscription;
    },
    resetLead: (state: StateT) => {
      state.lead = initialState.lead;
    },
  },
});

export const {
  setLeadList,
  setLead,
  setLeadProduct,
  setLeadCustomer,
  setLeadCompany,
  setLeadInsured,
  addLeadInsured,
  setLeadSubscription,
  resetLeadSubscription,
  resetLead,
} = leadSlice.actions;

export default leadSlice.reducer;
