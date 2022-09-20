import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";

export type CustomerT = {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
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

type ProductT = {
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
  email: string;
  phone: string;
};

type InsuredT = {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
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
  policy_id: string;
  isActive: boolean;
};

type StateT = {
  list: StateT[];
  productList: any[];
  lead: LeadT;
  isLoading: boolean;
};

const initialState: StateT = {
  list: [],
  productList: [],
  lead: {
    id: "",
    date: "",
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
    policy_id: "",
    isActive: false,
  },
  isLoading: false,
};

export const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setLeadList: (state: any, action: PayloadAction<any>) => {
      state.list = action.payload;
    },
    setLead: (state: any, action: PayloadAction<any>) => {
      state.lead = action.payload;
    },
    setLeadProduct: (state: any, action: PayloadAction<any>) => {
      state.lead = { ...state.lead, product: action.payload };
    },
    setLeadCustomer: (state: any, action: PayloadAction<any>) => {
      state.lead = { ...state.lead, customer: action.payload };
    },
    setLeadCompany: (state: any, action: PayloadAction<any>) => {
      state.lead = { ...state.lead, company: action.payload };
    },
    setLeadInsured: (state: any, action: PayloadAction<any>) => {
      state.lead = { ...state.lead, insured: action.payload };
    },
    setLeadSubscription: (state: any, action: PayloadAction<any>) => {
      state.lead = { ...state.lead, subscription: action.payload };
    },
    setProductList: (state: any, action: PayloadAction<any>) => {
      state.productList = action.payload;
    },
    setIsLoading: (state: any, action: PayloadAction<any>) => {
      state.isLoading = action.payload;
    },
    resetLeadSubscription: (state: any) => {
      state.lead.subscription = initialState.lead.subscription;
    },
    resetLead: (state: any) => {
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
  setLeadSubscription,
  setIsLoading,
  setProductList,
  resetLeadSubscription,
  resetLead,
} = leadSlice.actions;

export default leadSlice.reducer;

export const listLeads = () => (dispatch: any) => {
  axios
    .get(`${config.server}/api/lead/list`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(setLeadList(response.data));
    })
    .catch((error) => console.log(error));
};

export const getLeadBySubscriptionId =
  (subscriptionId: number) => (dispatch: any) => {
    axios
      .get(`${config.server}/api/lead/getBySubscriptionId/${subscriptionId}`, {
        headers: {
          id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
        },
      })
      .then((response) => {
        dispatch(setLead(response.data));
      })
      .catch((error) => console.log(error));
  };

export const getProductByInsuredId = (insuredId: string) => (dispatch: any) => {
  axios
    .get(`${config.server}/api/lead/getProductByInsuredId/${insuredId}`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(setProductList(response.data));
    })
    .catch((error) => console.log(error));
};

export const createLead = (lead: LeadT) => (dispatch: any) => {
  axios
    .post(`${config.server}/api/lead/create`, lead, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(setLead(response.data));
    })
    .catch((error) => console.log(error));
};

export const addBeneficiaries =
  (lead_id: string, insured_id: string, beneficiaries: BeneficiaryT[]) =>
  (dispatch: any) => {
    dispatch(setIsLoading(true));
    axios
      .post(
        `${config.server}/api/lead/addBeneficiaries`,
        { lead_id, insured_id, beneficiaries },
        {
          headers: {
            id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
          },
        }
      )
      .then((response) => {
        dispatch(setLead(response.data));
        setTimeout(() => {
          dispatch(setIsLoading(false));
        }, 1000);
      })
      .catch((error) => console.log(error));
  };

export const updateLead =
  (id: string, name: string, isBroker: boolean) => (dispatch: any) => {
    axios
      .put(
        `${config.server}/api/lead/update/${id}`,
        { name, isBroker },
        {
          headers: {
            id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
          },
        }
      )
      .then((response) => {
        dispatch(listLeads());
        dispatch(setLead(response.data));
      })
      .catch((error) => console.log(error));
  };

export const deleteLead = (id: string) => (dispatch: any) => {
  axios
    .delete(`${config.server}/api/lead/delete/${id}`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then(() => {
      dispatch(listLeads());
      dispatch(resetLead());
    })
    .catch((error) => console.log(error));
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
  (dispatch: any) => {
    axios
      .post(
        `${config.server}/api/lead/createSubscription`,
        {
          plan_id,
          email,
          name,
          amount,
          address,
          rut,
          phone,
        },
        {
          headers: {
            id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
          },
        }
      )
      .then((response) => {
        dispatch(setLeadSubscription(response.data));
      })
      .catch((error) => console.log(error));
  };
