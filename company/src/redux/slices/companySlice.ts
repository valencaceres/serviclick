import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";

type InsuredT = {
  id: string;
  rut: string;
  companyName: string;
  legalRepresentative: string;
  line: string;
  email: string;
  phone: string;
};

type CompanyT = {
  id: string;
  rut: string;
  companyName: string;
  legalRepresentative: string;
  line: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  insured: InsuredT[];
};

type StateT = {
  list: CompanyT[];
  company: CompanyT;
};

const initialState: StateT = {
  list: [],
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
    insured: [],
  },
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state: any, action: PayloadAction<any>) => {
      state.company = action.payload;
    },
    resetCompany: (state: any) => {
      state.company = initialState.company;
    },
  },
});

export const { setCompany, resetCompany } = companySlice.actions;

export default companySlice.reducer;

export const getCompanyByRut = (rut: string) => (dispatch: any) => {
  axios
    .get(`${config.server}/api/company/getByRut/${rut}`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(setCompany(response.data));
    })
    .catch((error) => console.log(error));
};

export const updateCompany =
  (
    id: string,
    rut: string,
    companyName: string,
    legalRepresentative: string,
    line: string,
    address: string,
    district: string,
    email: string,
    phone: string
  ) =>
  (dispatch: any) => {
    axios
      .post(
        `${config.server}/api/company/create`,
        {
          id,
          rut,
          companyName,
          legalRepresentative,
          line,
          address,
          district,
          email,
          phone,
        },
        {
          headers: {
            id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
          },
        }
      )
      .then((response) => {
        dispatch(setCompany(response.data));
      })
      .catch((error) => console.log(error));
  };
