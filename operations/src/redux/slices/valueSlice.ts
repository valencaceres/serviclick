import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export type FamilyT = {
  id: string;
  name: string;
};

export type ValueT = {
  id: string;
  family: FamilyT;
  name: string;
  valuetype_code: string;
};

type StateT = {
  list: ValueT[];
  value: ValueT;
  families: FamilyT[];
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  value: {
    id: "",
    family: {
      id: "",
      name: "",
    },
    name: "",
    valuetype_code: "",
  },
  families: [],
  loading: false,
  error: false,
};

export const valueSlice = createSlice({
  name: "values",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFamilies: (state: StateT, action: PayloadAction<FamilyT[]>) => {
      state.families = action.payload;
      state.loading = false;
      state.error = false;
    },
    setList: (state: StateT, action: PayloadAction<ValueT[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    set: (state: StateT, action: PayloadAction<ValueT>) => {
      state.value = action.payload;
      state.loading = false;
      state.error = false;
    },
    reset: (state: StateT) => {
      state.value = initialState.value;
    },
    resetList: (state: StateT) => {
      state.list = initialState.list;
    },
    resetAll: (state: any) => {
      state = initialState;
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
} = valueSlice.actions;

export default valueSlice.reducer;

export const create =
  (family_id: string, name: string, valuetype_code: string) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const resolveData = await apiInstance.post(`/value/create`, {
        family_id,
        name,
        valuetype_code,
      });
      dispatch(set(resolveData.data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const updateById =
  (id: string, family_id: string, name: string, valuetype_code: string) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const resolveData = await apiInstance.put(`/value/updateById`, {
        id,
        family_id,
        name,
        valuetype_code,
      });
      dispatch(set(resolveData.data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const getAll = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resolveData = await apiInstance.get(`/value/getAll`);
    dispatch(setList(resolveData.data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getById = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resolveData = await apiInstance.get(`/value/getById/${id}`);
    dispatch(set(resolveData.data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getFamilies = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resolveData = await apiInstance.get(`/value/getFamilies`);
    dispatch(setFamilies(resolveData.data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getByFamilyId = (family_id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const resolveData = await apiInstance.get(
      `/value/getByFamilyId/${family_id}`
    );
    dispatch(setList(resolveData.data));
  } catch (e) {
    dispatch(setError(true));
  }
};
