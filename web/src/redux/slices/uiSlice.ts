import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UIT = {
  isDesktop: boolean;
  agentId: string;
};

const initialState: UIT = {
  isDesktop: true,
  agentId: "",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDevice: (state: UIT, action: PayloadAction<boolean>) => {
      state.isDesktop = action.payload;
    },
    setAgent: (state: UIT, action: PayloadAction<string>) => {
      state.agentId = action.payload;
    },
    resetDevice: (state: UIT) => {
      state.isDesktop = initialState.isDesktop;
    },
  },
});

export const { setDevice, setAgent, resetDevice } = uiSlice.actions;

export default uiSlice.reducer;
