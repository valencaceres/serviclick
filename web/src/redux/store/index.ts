import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "../slices/uiSlice";
import userSlice from "../slices/userSlice";
import stageSlice from "../slices/stageSlice";
import channelSlice from "../slices/channelSlice";
import familySlice from "../slices/familySlice";
import productSlice from "../slices/productSlice";
import leadSlice from "../slices/leadSlice";
import subscriptionSlice from "../slices/subscriptionSlice";
import donorSlice from "../slices/donorSlice";
import donationSlice from "../slices/donationSlice";
import brokerSlice from "../slices/brokerSlice";
import districtSlice from "../slices/districtSlice";

// import { loadState } from "../../utils/reduxPersist";

const store = configureStore({
  reducer: {
    uiSlice,
    userSlice,
    stageSlice,
    channelSlice,
    familySlice,
    productSlice,
    leadSlice,
    subscriptionSlice,
    donorSlice,
    donationSlice,
    brokerSlice,
    districtSlice,
  },
  // preloadedState: loadState(),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
