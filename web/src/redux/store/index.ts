import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "../slices/uiSlice";
import userSlice from "../slices/userSlice";
import stageSlice from "../slices/stageSlice";
import channelSlice from "../slices/channelSlice";
import familySlice from "../slices/familySlice";
import productSlice from "../slices/productSlice";
import leadSlice from "../slices/leadSlice";
import subscriptionSlice from "../slices/subscriptionSlice";

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
  },
  // preloadedState: loadState(),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
