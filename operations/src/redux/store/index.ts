import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "../slices/uiSlice";
import statusSlice from "../slices/statusSlice";
import userSlice from "../slices/userSlice";
import channelSlice from "../slices/channelSlice";
import familySlice from "../slices/familySlice";
import productSlice from "../slices/productSlice";
import transactionSlice from "../slices/transactionSlice";
import agentSlice from "../slices/agentSlice";
import brokerSlice from "../slices/brokerSlice";
import retailSlice from "../slices/retailSlice";
import districtSlice from "../slices/districtSlice";
import assistanceSlice from "../slices/assistanceSlice";
import valueSlice from "../slices/valueSlice";
import valueTypeSlice from "../slices/valueTypeSlice";
import contractorSlice from "../slices/contractorSlice";
import specialtySlice from "../slices/specialtySlice";
import documentSlice from "../slices/documentSlice";
import stageSlice from "../slices/stageSlice";
import specialistSlice from "../slices/specialistSlice";
import fileFormatSlice from "../slices/fileFormatSlice";
import fieldSlice from "../slices/fieldSlice";
import companySlice from "../slices/companySlice";

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
    brokerSlice,
    retailSlice,
    districtSlice,
    assistanceSlice,
    valueSlice,
    valueTypeSlice,
    contractorSlice,
    specialtySlice,
    documentSlice,
    stageSlice,
    specialistSlice,
    fileFormatSlice,
    fieldSlice,
    companySlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
