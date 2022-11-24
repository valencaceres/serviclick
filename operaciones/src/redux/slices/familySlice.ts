import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";

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
};

const initialState: StateT = {
  list: [],
  family: { id: "", name: "", values: [], isActive: false },
};

export const familySlice = createSlice({
  name: "families",
  initialState,
  reducers: {
    setFamilyList: (state: any, action: PayloadAction<any>) => {
      state.list = action.payload;
    },
    setFamily: (state: any, action: PayloadAction<any>) => {
      state.family = action.payload;
    },
    addFamilyValue: (state: any, action: PayloadAction<any>) => {
      state.family = {
        ...state.family,
        name: state.family.name,
        values: [...state.family.values, { id: "", name: action.payload }],
      };
    },
    resetFamily: (state: any) => {
      state.family = initialState.family;
    },
  },
});

export const { setFamilyList, setFamily, addFamilyValue, resetFamily } =
  familySlice.actions;

export default familySlice.reducer;

export const createFamily = (name: string, values: any) => (dispatch: any) => {
  axios
    .post(
      `${config.server}/api/family/create`,
      { name, values },
      {
        headers: {
          id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
        },
      }
    )
    .then((response) => {
      dispatch(listFamilies());
      dispatch(setFamily(response.data));
    })
    .catch((error) => console.log(error));
};

export const updateFamily =
  (id: string, name: string, values: any) => (dispatch: any) => {
    axios
      .put(
        `${config.server}/api/family/update/${id}`,
        { name, values },
        {
          headers: {
            id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
          },
        }
      )
      .then((response) => {
        dispatch(listFamilies());
        dispatch(setFamily(response.data));
      })
      .catch((error) => console.log(error));
  };

export const deleteFamily = (id: string) => (dispatch: any) => {
  axios
    .delete(`${config.server}/api/family/delete/${id}`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then(() => {
      dispatch(listFamilies());
      dispatch(resetFamily());
    })
    .catch((error) => console.log(error));
};

export const getFamily = (id: string) => (dispatch: any) => {
  axios
    .get(`${config.server}/api/family/get/${id}`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(setFamily(response.data));
    })
    .catch((error) => console.log(error));
};

export const listFamilies = () => (dispatch: any) => {
  axios
    .get(`${config.server}/api/family/list`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(setFamilyList(response.data));
    })
    .catch((error) => console.log(error));
};
