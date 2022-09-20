import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StageT = {
  name: "contract" | "insured" | "beneficiary" | "payment" | "resume";
  type: "customer" | "company";
};

type StateT = {
  list: StageT[];
  stage: StageT;
};

const initialState: StateT = {
  list: [],
  stage: { name: "contract", type: "customer" },
};

export const stageSlice = createSlice({
  name: "stages",
  initialState,
  reducers: {
    setStageList: (state: any, action: PayloadAction<any>) => {
      state.list = action.payload;
    },
    setStage: (state: any, action: PayloadAction<any>) => {
      state.stage = action.payload;
    },
    resetStage: (state: any) => {
      state.stage = initialState.stage;
    },
  },
});

export const { setStageList, setStage, resetStage } = stageSlice.actions;

export default stageSlice.reducer;
