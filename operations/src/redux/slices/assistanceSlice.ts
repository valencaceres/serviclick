import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

import { IFamily } from "../../interfaces/family";
import { IAssistance } from "../../interfaces/assistance";

type StateT = {
  list: IAssistance[];
  assistance: IAssistance;
  families: IFamily[];
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  assistance: {
    id: "",
    name: "",
    description: "",
    family: {
      id: "",
      name: "",
    },
    values: [],
    specialties: [],
    documents: [],
    benefits: [],
    exclusions: [],
  },
  families: [],
  loading: false,
  error: false,
};

export const assistanceSlice = createSlice({
  name: "assistances",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFamilies: (state: StateT, action: PayloadAction<IFamily[]>) => {
      state.families = action.payload;
      state.loading = false;
      state.error = false;
    },
    setList: (state: StateT, action: PayloadAction<IAssistance[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    set: (state: StateT, action: PayloadAction<IAssistance>) => {
      state.assistance = action.payload;
      state.loading = false;
      state.error = false;
    },
    reset: (state: StateT) => {
      state.assistance = initialState.assistance;
      state.loading = false;
      state.error = false;
    },
    resetList: (state: StateT) => {
      state.assistance = initialState.assistance;
      state.loading = false;
      state.error = false;
    },
    resetAll: (state: StateT) => {
      state.assistance = initialState.assistance;
    },
  },
});

export const {
  setLoading,
  setError,
  setFamilies,
  setList,
  set,
  reset,
  resetList,
  resetAll,
} = assistanceSlice.actions;

export default assistanceSlice.reducer;

export const create = (assistance: IAssistance) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resolveData = await apiInstance.post(
      `/assistance/create`,
      assistance
    );
    dispatch(set(resolveData.data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const updateById =
  (assistance: IAssistance) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const resolveData = await apiInstance.put(
        `/assistance/updateById`,
        assistance
      );
      dispatch(set(resolveData.data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const getAll = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resolveData = await apiInstance.get(`/assistance/getAll`);
    dispatch(setList(resolveData.data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getById = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resolveData = await apiInstance.get(`/assistance/getById/${id}`);
    dispatch(set(resolveData.data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getFamilies = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resolveData = await apiInstance.get(`/assistance/getFamilies`);
    dispatch(setFamilies(resolveData.data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getByFamilyId = (family_id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resolveData = await apiInstance.get(
      `/assistance/getByFamilyId/${family_id}`
    );
    dispatch(setList(resolveData.data));
  } catch (e) {
    dispatch(setError(true));
  }
};
