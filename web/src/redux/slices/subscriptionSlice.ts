import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";

const initialState = {
  list: [],
  active: [],
  subscription: { id: 0 },
};

export const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    setSubscription: (state: any, action: PayloadAction<any>) => {
      state.subscription = action.payload;
    },
    setActiveSubscriptions: (state: any, action: PayloadAction<any>) => {
      state.active = action.payload;
    },
    resetSubscription: (state: any) => {
      state.subscription = initialState.subscription;
    },
  },
});

export const { setSubscription, resetSubscription, setActiveSubscriptions } =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;

export const getActivesByRutAndProductId =
  (customer_type: string, rut: string, product_id: string) =>
  (dispatch: any) => {
    axios
      .post(
        `${config.server}/api/transaction/getActivesByRutAndProductId`,
        {
          customer_type,
          rut,
          product_id,
        },
        {
          headers: {
            id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
          },
        }
      )
      .then((response) => {
        dispatch(setActiveSubscriptions(response.data));
      })
      .catch((error) => console.log(error));
  };
