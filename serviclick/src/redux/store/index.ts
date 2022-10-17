import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "../slices/uiSlice";
import statusSlice from "../slices/statusSlice";
import userSlice from "../slices/userSlice";
import channelSlice from "../slices/channelSlice";
import familySlice from "../slices/familySlice";
import productSlice from "../slices/productSlice";
import transactionSlice from "../slices/transactionSlice";
import agentSlice from "../slices/agentSlice";

const store = configureStore({
  reducer: {
    uiSlice,
    statusSlice,
    userSlice,
    channelSlice,
    familySlice,
    productSlice,
    transactionSlice,
    agentSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
