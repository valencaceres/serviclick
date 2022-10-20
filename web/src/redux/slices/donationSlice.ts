import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";

export type DonorT = {
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

export type DonationT = {
  id: string;
  donor: DonorT;
  product_id: string;
  price: number;
  subscription_id: number;
  agent_id: string;
};

type StateT = {
  list: DonationT[];
  donation: DonationT;
};

const initialState: StateT = {
  list: [],
  donation: {
    id: "",
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
    product_id: "",
    price: 0,
    subscription_id: 0,
    agent_id: "",
  },
};

export const donationSlice = createSlice({
  name: "donations",
  initialState,
  reducers: {
    set: (state: StateT, action: PayloadAction<DonationT>) => {
      state.donation = action.payload;
    },
    setDonor: (state: StateT, action: PayloadAction<DonorT>) => {
      state.donation.donor = action.payload;
    },
    setSubscription: (state: StateT, action: PayloadAction<number>) => {
      state.donation.subscription_id = action.payload;
    },
    resetSubscription: (state: StateT) => {
      state.donation.subscription_id = initialState.donation.subscription_id;
    },
    reset: (state: StateT) => {
      state.donation = initialState.donation;
    },
  },
});

export const { set, setDonor, setSubscription, resetSubscription, reset } =
  donationSlice.actions;

export default donationSlice.reducer;

export const getBySubscriptionId =
  (subscriptionId: number) => (dispatch: any) => {
    axios
      .get(
        `${config.server}/api/donation/getBySubscriptionId/${subscriptionId}`,
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

export const getById = (id: string) => (dispatch: any) => {
  axios
    .get(`${config.server}/api/donation/getById/${id}`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(set(response.data));
    })
    .catch((error) => console.log(error));
};

export const create = (donation: DonationT) => (dispatch: any) => {
  axios
    .post(`${config.server}/api/donation/create`, donation, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(set(response.data));
    })
    .catch((error) => console.log(error));
};
