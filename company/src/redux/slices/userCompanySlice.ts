import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";

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
};

type ProductT = {
  id: string;
  family_icon: string;
  family_name: string;
  name: string;
  price: number;
  frequency_code: string;
  numberBeneficiaries: number;
  insured: InsuredT[];
};

type LeadT = {
  lead_id: string;
  customer_id: string;
  company_id: string;
  subscription_id: string;
  products: ProductT[];
};

type UserCompanyT = {
  id: string;
  rut: string;
  companyName: string;
  legalRepresentative: string;
  line: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  leads: LeadT[];
};

type StateT = {
  userCompany: UserCompanyT;
  session: {
    product_id: string;
    beneficiaries: number;
    insured: InsuredT[];
  };
};

const initialState: StateT = {
  userCompany: {
    id: "",
    rut: "",
    companyName: "",
    legalRepresentative: "",
    line: "",
    address: "",
    district: "",
    email: "",
    phone: "",
    leads: [],
  },
  session: {
    product_id: "",
    beneficiaries: 0,
    insured: [],
  },
};

export const userCompanySlice = createSlice({
  name: "userCompany",
  initialState,
  reducers: {
    setUserCompany: (state: any, action: PayloadAction<any>) => {
      state.userCompany = action.payload;
    },
    setSession: (state: any, action: PayloadAction<any>) => {
      state.session = action.payload;
    },
    resetUserCompany: (state: any) => {
      state.userCompany = initialState.userCompany;
    },
  },
});

export const { setUserCompany, setSession, resetUserCompany } =
  userCompanySlice.actions;

export default userCompanySlice.reducer;

export const validateUserCompany =
  (login: string, password: string) => (dispatch: any) => {
    axios
      .post(
        `${config.server}/api/userCompany/validate`,
        { login, password },
        {
          headers: {
            id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
          },
        }
      )
      .then((response) => {
        dispatch(setUserCompany(response.data));
      })
      .catch((error) => console.log(error));
  };

export const getByEmail = (email: string) => (dispatch: any) => {
  axios
    .get(`${config.server}/api/userCompany/getByEmail/${email}`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(setUserCompany(response.data));
    })
    .catch((error) => console.log(error));
};
