import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isDesktop: true,
  isLoading: true,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDevice: (state: any, action: PayloadAction<any>) => {
      state.isDesktop = action.payload;
    },
    setIsLoading: (state: any, action: PayloadAction<any>) => {
      state.isLoading = action.payload;
    },
    resetDevice: (state: any) => {
      state.isDesktop = initialState.isDesktop;
    },
  },
});

export const { setDevice, setIsLoading, resetDevice } = uiSlice.actions;

export default uiSlice.reducer;
