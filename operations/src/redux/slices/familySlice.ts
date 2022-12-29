import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export type FamilyT = {
  id: string;
  name: string;
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
  family: { id: "", name: "", isActive: false },
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
    resetFamily: (state: any) => {
      state.family = initialState.family;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { setLoading, setError, setFamilyList, setFamily, resetFamily } =
  familySlice.actions;

export default familySlice.reducer;

export const createFamily = (name: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`/family/create`, {
      name,
    });
    dispatch(listFamilies());
    dispatch(setFamily(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const updateFamily =
  (id: string, name: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.put(`/family/update/${id}`, {
        name,
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
    const { data } = await apiInstance.delete(`/family/delete/${id}`);
    dispatch(listFamilies());
    dispatch(resetFamily());
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getFamily = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/family/get/${id}`);
    dispatch(setFamily(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const listFamilies = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/family/list`);
    dispatch(setFamilyList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};
