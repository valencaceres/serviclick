import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";

type DonorT = {
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

type StateT = {
  list: DonorT[];
  donor: DonorT;
};

const initialState: StateT = {
  list: [],
  donor: {
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
};

export const donorSlice = createSlice({
  name: "donors",
  initialState,
  reducers: {
    setList: (state: StateT, action: PayloadAction<DonorT[]>) => {
      state.list = action.payload;
    },
    set: (state: StateT, action: PayloadAction<DonorT>) => {
      state.donor = action.payload;
    },
    reset: (state: StateT) => {
      state.donor = initialState.donor;
    },
  },
});

export const { setList, set, reset } = donorSlice.actions;

export default donorSlice.reducer;

export const getByRut = (rut: string) => (dispatch: any) => {
  axios
    .get(`${config.server}/api/donor/getByRut/${rut}`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(set(response.data));
    })
    .catch((error) => console.log(error));
};

export const create =
  (
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
        `${config.server}/api/donor/create`,
        {
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
        dispatch(set(response.data));
      })
      .catch((error) => console.log(error));
  };
