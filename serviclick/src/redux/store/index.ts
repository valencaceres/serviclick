import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "../slices/uiSlice";
import userSlice from "../slices/userSlice";
import channelSlice from "../slices/channelSlice";
import familySlice from "../slices/familySlice";
import productSlice from "../slices/productSlice";

const store = configureStore({
  reducer: { uiSlice, userSlice, channelSlice, familySlice, productSlice },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
