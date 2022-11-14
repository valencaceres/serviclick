import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export type SubscriptionT = {
  id: number;
};

type StateT = {
  list: any[];
  active: any[];
  subscription: SubscriptionT;
  loading: boolean;
};

const initialState: StateT = {
  list: [],
  active: [],
  subscription: { id: 0 },
  loading: false,
};

export const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSubscription: (state: StateT, action: PayloadAction<SubscriptionT>) => {
      state.subscription = action.payload;
      state.loading = false;
    },
    setActiveSubscriptions: (state: StateT, action: PayloadAction<any[]>) => {
      state.active = action.payload;
      state.loading = false;
    },
    resetSubscription: (state: StateT) => {
      state.subscription = initialState.subscription;
    },
  },
});

export const {
  setLoading,
  setSubscription,
  resetSubscription,
  setActiveSubscriptions,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;

export const getActivesByRutAndProductId =
  (customer_type: string, rut: string, product_id: string) =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(
      `/api/transaction/getActivesByRutAndProductId`,
      {
        customer_type,
        rut,
        product_id,
      }
    );
    dispatch(setActiveSubscriptions(data));
  };
