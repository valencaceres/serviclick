import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";

type BeneficiaryT = {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  birthDate: string;
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
  beneficiaries: BeneficiaryT[];
};

type LeadT = {
  lead_id: string;
  customer_id: string;
  company_id: string;
  subscription_id: string;
  products: ProductT[];
};

type UserInsuredT = {
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
  leads: LeadT[];
};

type StateT = {
  userInsured: UserInsuredT;
  session: {
    lead_id: string;
    product_id: string;
    numberBeneficiaries: number;
    beneficiaries: BeneficiaryT[];
  };
};

const initialState: StateT = {
  userInsured: {
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
    leads: [],
  },
  session: {
    lead_id: "",
    product_id: "",
    numberBeneficiaries: 0,
    beneficiaries: [],
  },
};

export const userInsuredSlice = createSlice({
  name: "userInsured",
  initialState,
  reducers: {
    setUserInsured: (state: any, action: PayloadAction<any>) => {
      state.userInsured = action.payload;
    },
    setSession: (state: any, action: PayloadAction<any>) => {
      state.session = action.payload;
    },
    resetUserInsured: (state: any) => {
      state.userInsured = initialState.userInsured;
    },
  },
});

export const { setUserInsured, setSession, resetUserInsured } =
  userInsuredSlice.actions;

export default userInsuredSlice.reducer;

export const validateUserInsured =
  (login: string, password: string) => (dispatch: any) => {
    axios
      .post(
        `${config.server}/api/userInsured/validate`,
        { login, password },
        {
          headers: {
            id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
          },
        }
      )
      .then((response) => {
        dispatch(setUserInsured(response.data));
      })
      .catch((error) => console.log(error));
  };

export const getByEmail = (email: string) => (dispatch: any) => {
  axios
    .get(`${config.server}/api/userInsured/getByEmail/${email}`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(setUserInsured(response.data));
    })
    .catch((error) => console.log(error));
};
