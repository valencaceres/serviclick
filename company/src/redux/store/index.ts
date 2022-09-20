import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "../slices/uiSlice";
import userInsuredSlice from "../slices/userInsuredSlice";
import userCompanySlice from "../slices/userCompanySlice";
import stageSlice from "../slices/stageSlice";
import channelSlice from "../slices/channelSlice";
import familySlice from "../slices/familySlice";
import productSlice from "../slices/productSlice";
import leadSlice from "../slices/leadSlice";
import subscriptionSlice from "../slices/subscriptionSlice";
import insuredSlice from "../slices/insuredSlice";
import companySlice from "../slices/companySlice";

const store = configureStore({
  reducer: {
    uiSlice,
    userInsuredSlice,
    userCompanySlice,
    stageSlice,
    channelSlice,
    familySlice,
    productSlice,
    leadSlice,
    subscriptionSlice,
    insuredSlice,
    companySlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
