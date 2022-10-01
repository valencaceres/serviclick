import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";

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

type InsuredT = {
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

type StateT = {
  list: InsuredT[];
  insured: InsuredT;
};

const initialState: StateT = {
  list: [],
  insured: {
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
    beneficiaries: [],
  },
};

export const insuredSlice = createSlice({
  name: "insured",
  initialState,
  reducers: {
    setInsured: (state: any, action: PayloadAction<any>) => {
      state.insured = action.payload;
    },
    resetInsured: (state: any) => {
      state.insured = initialState.insured;
    },
  },
});

export const { setInsured, resetInsured } = insuredSlice.actions;

export default insuredSlice.reducer;

export const getInsuredByRut = (rut: string) => (dispatch: any) => {
  axios
    .get(`${config.server}/api/insured/getByRut/${rut}`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(setInsured(response.data));
    })
    .catch((error) => console.log(error));
};

export const updateInsured =
  (
    id: string,
    rut: string,
    name: string,
    paternalLastName: string,
    maternalLastName: string,
    birthDate: string,
    address: string,
    district: string,
    email: string,
    phone: string
  ) =>
  (dispatch: any) => {
    axios
      .post(
        `${config.server}/api/insured/create`,
        {
          id,
          rut,
          name,
          paternalLastName,
          maternalLastName,
          birthDate,
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
        dispatch(setInsured(response.data));
      })
      .catch((error) => console.log(error));
  };
