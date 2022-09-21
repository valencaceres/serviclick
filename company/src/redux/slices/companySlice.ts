import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";

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
};

type ProductT = {
  family_icon: string;
  family_name: string;
  id: string;
  name: string;
  beneficiaries: string;
  price: string;
  frequency_code: string;
  insured: InsuredT[];
};

type StateT = {
  list: CompanyT[];
  company: CompanyT;
  products: ProductT[];
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
  },
  products: [],
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state: any, action: PayloadAction<any>) => {
      state.company = action.payload;
    },
    setProducts: (state: any, action: PayloadAction<any>) => {
      state.products = action.payload;
    },
    resetCompany: (state: any) => {
      state.company = initialState.company;
    },
  },
});

export const { setCompany, setProducts, resetCompany } = companySlice.actions;
export type { ProductT, InsuredT };

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

export const getProductsAndInsuredById = (id: string) => (dispatch: any) => {
  axios
    .get(`${config.server}/api/company/getProductsAndInsuredById/${id}`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(setProducts(response.data));
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
