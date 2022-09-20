import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "../slices/uiSlice";
import userInsuredSlice from "../slices/userInsuredSlice";
import stageSlice from "../slices/stageSlice";
import channelSlice from "../slices/channelSlice";
import familySlice from "../slices/familySlice";
import productSlice from "../slices/productSlice";
import leadSlice from "../slices/leadSlice";
import subscriptionSlice from "../slices/subscriptionSlice";
import insuredSlice from "../slices/insuredSlice";

const store = configureStore({
  reducer: {
    uiSlice,
    userInsuredSlice,
    stageSlice,
    channelSlice,
    familySlice,
    productSlice,
    leadSlice,
    subscriptionSlice,
    insuredSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
