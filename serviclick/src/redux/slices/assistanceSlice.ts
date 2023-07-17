import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

type FamilyT = {
  id: string;
  name: string;
};

type ValueT = {
  id: string;
  name: string;
};

type BenefitT = {
  id: string;
  description: string;
};

type ExclusionT = {
  id: string;
  description: string;
};

export interface IDocument {
  id: string;
  family_id: string;
  name: string;
}

export interface ISpecialty {
  id: string;
  family_id: string;
  family_name: string;
  name: string;
}

export type AssistanceT = {
  id: string;
  name: string;
  description: string;
  family: FamilyT;
  values: ValueT[];
  benefits: BenefitT[];
  exclusions: ExclusionT[];
  documents: IDocument[];
  specialties: ISpecialty[];
};

type StateT = {
  list: AssistanceT[];
  assistance: AssistanceT;
  families: FamilyT[];
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
    benefits: [],
    exclusions: [],
    documents: [],
    specialties: [],
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
    setFamilies: (state: StateT, action: PayloadAction<FamilyT[]>) => {
      state.families = action.payload;
      state.loading = false;
      state.error = false;
    },
    setList: (state: StateT, action: PayloadAction<AssistanceT[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    set: (state: StateT, action: PayloadAction<AssistanceT>) => {
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

export const create = (assistance: AssistanceT) => async (dispatch: any) => {
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
  (assistance: AssistanceT) => async (dispatch: any) => {
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
