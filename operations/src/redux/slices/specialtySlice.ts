import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

import { ISpecialty } from "../../interfaces/specialty";
import { IFamily } from "../../interfaces/family";

type StateT = {
  list: ISpecialty[];
  specialty: ISpecialty;
  families: IFamily[];
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  specialty: { id: "", family_id: "", name: "" },
  families: [],
  loading: false,
  error: false,
};

export const specialtySlice = createSlice({
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
    setSpecialtyList: (state: StateT, action: PayloadAction<ISpecialty[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setSpecialty: (state: StateT, action: PayloadAction<ISpecialty>) => {
      state.specialty = action.payload;
      state.loading = false;
      state.error = false;
    },
    setFamilies: (state: StateT, action: PayloadAction<IFamily[]>) => {
      state.families = action.payload;
      state.loading = false;
      state.error = false;
    },
    resetSpecialty: (state: StateT) => {
      state.specialty = initialState.specialty;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  setLoading,
  setError,
  setSpecialtyList,
  setSpecialty,
  setFamilies,
  resetSpecialty,
} = specialtySlice.actions;

export default specialtySlice.reducer;

export const createSpecialty =
  (specialty: ISpecialty) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.post(`/specialty/create`, specialty);
      dispatch(getAllSpecialties());
      dispatch(setSpecialty(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const updateSpecialty =
  (specialty: ISpecialty) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.put(
        `/specialty/update/${specialty.id}`,
        specialty
      );
      dispatch(getAllSpecialties());
      dispatch(setSpecialty(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const deleteSpecialty = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.delete(`/specialty/delete/${id}`);
    dispatch(getAllSpecialties());
    dispatch(resetSpecialty());
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getSpecialty = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/specialty/get/${id}`);
    dispatch(setSpecialty(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getAllSpecialties = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/specialty/getAllSpecialties`);
    dispatch(setSpecialtyList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getSpecialtiesByFamilyId =
  (family_id: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.get(
        `/specialty/getSpecialtiesByFamilyId/${family_id}`
      );
      dispatch(setSpecialtyList(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const getFamilies = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/specialty/families`);
    dispatch(setFamilies(data));
  } catch (e) {
    dispatch(setError(true));
  }
};
