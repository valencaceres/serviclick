import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

import { ISpecialist } from "../../interfaces/specialist";
import { IFamily } from "../../interfaces/family";
import { IAssistance } from "../../interfaces/assistance";

type StateT = {
  list: ISpecialist[];
  specialist: ISpecialist;
  families: IFamily[];
  assistances: IAssistance[];
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  specialist: {
    id: "",
    rut: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    address: "",
    district: "",
    email: "",
    phone: "",
    birthDate: "",
    specialties: [],
    districts: [],
  },
  families: [],
  assistances: [],
  loading: false,
  error: false,
};

export const specialistSlice = createSlice({
  name: "specialists",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSpecialistList: (
      state: StateT,
      action: PayloadAction<ISpecialist[]>
    ) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setSpecialist: (state: StateT, action: PayloadAction<ISpecialist>) => {
      state.specialist = action.payload;
      state.loading = false;
      state.error = false;
    },
    setFamilies: (state: StateT, action: PayloadAction<IFamily[]>) => {
      state.families = action.payload;
      state.loading = false;
      state.error = false;
    },
    setAssistances: (state: StateT, action: PayloadAction<IAssistance[]>) => {
      state.assistances = action.payload;
      state.loading = false;
      state.error = false;
    },
    resetSpecialist: (state: StateT) => {
      state.specialist = initialState.specialist;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  setLoading,
  setError,
  setSpecialistList,
  setSpecialist,
  setFamilies,
  setAssistances,
  resetSpecialist,
} = specialistSlice.actions;

export default specialistSlice.reducer;

export const create = (specialist: ISpecialist) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`/specialist/create`, specialist);
    dispatch(getAll());
    dispatch(setSpecialist(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const deleteById = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    await apiInstance.delete(`/specialist/deleteById/${id}`);
    dispatch(getAll());
    dispatch(resetSpecialist());
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getAll = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/specialist/getAll`);
    dispatch(setSpecialistList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getById = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/specialist/get/${id}`);
    dispatch(setSpecialist(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getFamilies = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/specialist/getFamilies`);
    dispatch(setFamilies(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getAssistances = (family_id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(
      `/specialist/getAssistances/${family_id}`
    );
    dispatch(setAssistances(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getByFamilyAssistance =
  (family_id: string, assistance_id: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.get(
        `/specialist/getByFamilyAssistance/${family_id}/${assistance_id}`
      );
      dispatch(setSpecialistList(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };
