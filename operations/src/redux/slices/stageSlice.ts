import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

import { IStage } from "../../interfaces/stage";

type StateT = {
  list: IStage[];
  stage: IStage;
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  stage: { id: "", name: "" },
  loading: false,
  error: false,
};

export const stageSlice = createSlice({
  name: "stages",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setStageList: (state: StateT, action: PayloadAction<IStage[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setStage: (state: StateT, action: PayloadAction<IStage>) => {
      state.stage = action.payload;
      state.loading = false;
      state.error = false;
    },
    resetStage: (state: StateT) => {
      state.stage = initialState.stage;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { setLoading, setError, setStageList, setStage, resetStage } =
  stageSlice.actions;

export default stageSlice.reducer;

export const createStage = (name: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`/stage/create`, {
      name,
    });
    dispatch(getAllStages());
    dispatch(setStage(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const updateStage =
  (id: string, name: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.put(`/stage/update/${id}`, {
        name,
      });
      dispatch(getAllStages());
      dispatch(setStage(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const deleteStage = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.delete(`/stage/delete/${id}`);
    dispatch(getAllStages());
    dispatch(resetStage());
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getStage = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/stage/get/${id}`);
    dispatch(setStage(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getAllStages = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/stage/getAll`);
    dispatch(setStageList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};
