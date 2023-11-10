import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { apiInstance } from "../../utils/api";

import { config } from "../../utils/config";

type RetailT = {
  id: string;
  rut: string;
  name: string;
  logo: string;
};

type UserRetailT = {
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
  profileCode: string;
  profileName: string;
};

type StateT = {
  list: UserRetailT[];
  retail: RetailT;
  userRetail: UserRetailT;
  loading: boolean;
  response: any;
};

const initialState: StateT = {
  list: [],
  retail: {
    id: "",
    rut: "",
    name: "",
    logo: "",
  },
  userRetail: {
    rut: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    email: "",
    profileCode: "",
    profileName: "",
  },
  loading: false,
  response: null,
};

export const userRetailSlice = createSlice({
  name: "userRetails",
  initialState,
  reducers: {
    setUserRetailList: (
      state: StateT,
      action: PayloadAction<UserRetailT[]>
    ) => {
      state.list = action.payload;
    },
    setRetail: (state: StateT, action: PayloadAction<RetailT>) => {
      state.retail = action.payload;
      state.loading = false;
    },
    setUserRetail: (state: StateT, action: PayloadAction<UserRetailT>) => {
      state.userRetail = action.payload;
      state.loading = false;
    },
    setRetailAndUser: (state: StateT, action: PayloadAction<any>) => {
      state.retail = action.payload.retail;
      state.userRetail = action.payload.user;
      state.loading = false;
    },
    setResponse: (state: StateT, action: PayloadAction<any>) => {
      state.response = action.payload;
      state.loading = false;
    },
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetRetail: (state: StateT) => {
      state.retail = initialState.retail;
    },
    resetUserRetail: (state: StateT) => {
      state.userRetail = initialState.userRetail;
    },
  },
});

export const {
  setUserRetailList,
  setRetail,
  setUserRetail,
  setRetailAndUser,
  setLoading,
  setResponse,
  resetRetail,
  resetUserRetail,
} = userRetailSlice.actions;

export default userRetailSlice.reducer;

export const validateUserRetail =
  (retail_rut: string, login: string, password: string) =>
  async (dispatch: any) => {
    // axios
    //   .post(
    //     `${config.server}/api/userRetail/validate`,
    //     { retail_rut, login, password },
    //     {
    //       headers: {
    //         id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     dispatch(setRetail(response.data.retail));
    //     dispatch(setUserRetail(response.data.user));
    //   })
    //   .catch((error) => console.log(error));
    dispatch(setLoading(true));

    const { data } = await apiInstance.post(`/userRetail/validate`, {
      retail_rut,
      login,
      password,
    });

    dispatch(setRetail(data.retail));
    dispatch(setUserRetail(data.user));
    dispatch(setRetailAndUser(data));
  };

export const sendCredentials =
  (retail_rut: string, email: string) => async (dispatch: any) => {
    // const { success, data, error } = await post(`userRetail/sendCredentials`, {
    //   retail_rut,
    //   email,
    // });

    // if (!success) {
    //   console.log(error);
    //   return false;
    // }

    // dispatch(setResponse(data));
    // dispatch(setLoading(false));
    // return true;
    dispatch(setLoading(true));

    const { data } = await apiInstance.post(`/userRetail/sendCredentials`, {
      retail_rut,
      email,
    });

    dispatch(setResponse(data));
  };

export const updatePassword =
  (retail_rut: string, email: string, password: string, newPassword: string) =>
  async (dispatch: any) => {
    // const { success, data, error } = await post(`userRetail/updatePassword`, {
    //   retail_rut,
    //   email,
    //   password,
    //   newPassword,
    // });

    // if (!success) {
    //   console.log(error);
    //   return false;
    // }

    // dispatch(setResponse(data));
    // dispatch(setLoading(false));
    // return true;
    dispatch(setLoading(true));

    const { data } = await apiInstance.post(`/userRetail/updatePassword`, {
      retail_rut,
      email,
      password,
      newPassword,
    });

    dispatch(setResponse(data));
  };
