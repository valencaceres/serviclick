import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isDesktop: true,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDevice: (state: any, action: PayloadAction<any>) => {
      state.isDesktop = action.payload;
    },
    resetDevice: (state: any) => {
      state.isDesktop = initialState.isDesktop;
    },
  },
});

export const { setDevice, resetDevice } = uiSlice.actions;

export default uiSlice.reducer;
