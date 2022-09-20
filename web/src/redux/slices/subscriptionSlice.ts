import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  subscription: { id: 0 },
};

export const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    setSubscription: (state: any, action: PayloadAction<any>) => {
      state.subscription = action.payload;
    },
    resetSubscription: (state: any) => {
      state.subscription = initialState.subscription;
    },
  },
});

export const { setSubscription, resetSubscription } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
