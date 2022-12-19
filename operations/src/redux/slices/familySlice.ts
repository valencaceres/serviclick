import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export type ValueT = {
  id: string;
  name: string;
};

export type FamilyT = {
  id: string;
  name: string;
  values: ValueT[];
  isActive: boolean;
};

type StateT = {
  list: FamilyT[];
  family: FamilyT;
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  family: { id: "", name: "", values: [], isActive: false },
  loading: false,
  error: false,
};

export const familySlice = createSlice({
  name: "families",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFamilyList: (state: any, action: PayloadAction<any>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setFamily: (state: any, action: PayloadAction<any>) => {
      state.family = action.payload;
      state.loading = false;
      state.error = false;
    },
    addFamilyValue: (state: any, action: PayloadAction<any>) => {
      state.family = {
        ...state.family,
        name: state.family.name,
        values: [...state.family.values, { id: "", name: action.payload }],
      };
      state.loading = false;
      state.error = false;
    },
    resetFamily: (state: any) => {
      state.family = initialState.family;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  setLoading,
  setError,
  setFamilyList,
  setFamily,
  addFamilyValue,
  resetFamily,
} = familySlice.actions;

export default familySlice.reducer;

export const createFamily =
  (name: string, values: any) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.post(`/api/family/create`, {
        name,
        values,
      });
      dispatch(listFamilies());
      dispatch(setFamily(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const updateFamily =
  (id: string, name: string, values: any) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.put(`/api/family/update/${id}`, {
        name,
        values,
      });
      dispatch(listFamilies());
      dispatch(setFamily(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const deleteFamily = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.delete(`/api/family/delete/${id}`);
    dispatch(listFamilies());
    dispatch(resetFamily());
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getFamily = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/api/family/get/${id}`);
    dispatch(setFamily(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const listFamilies = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/api/family/list`);
    dispatch(setFamilyList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};
