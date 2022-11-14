import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StageT = {
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
    setStageList: (state: StateT, action: PayloadAction<StageT[]>) => {
      state.list = action.payload;
    },
    setStage: (state: StateT, action: PayloadAction<StageT>) => {
      state.stage = action.payload;
    },
    resetStage: (state: StateT) => {
      state.stage = initialState.stage;
    },
  },
});

export const { setStageList, setStage, resetStage } = stageSlice.actions;

export default stageSlice.reducer;
