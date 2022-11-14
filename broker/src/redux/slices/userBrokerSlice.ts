import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { apiInstance } from "../../utils/api";

import { config } from "../../utils/config";

type BrokerT = {
  id: string;
  rut: string;
  name: string;
  logo: string;
};

type UserBrokerT = {
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
  profileCode: string;
  profileName: string;
};

type StateT = {
  list: UserBrokerT[];
  broker: BrokerT;
  userBroker: UserBrokerT;
  loading: boolean;
  response: any;
};

const initialState: StateT = {
  list: [],
  broker: {
    id: "",
    rut: "",
    name: "",
    logo: "",
  },
  userBroker: {
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

export const userBrokerSlice = createSlice({
  name: "userBrokers",
  initialState,
  reducers: {
    setUserBrokerList: (
      state: StateT,
      action: PayloadAction<UserBrokerT[]>
    ) => {
      state.list = action.payload;
    },
    setBroker: (state: StateT, action: PayloadAction<BrokerT>) => {
      state.broker = action.payload;
      state.loading = false;
    },
    setUserBroker: (state: StateT, action: PayloadAction<UserBrokerT>) => {
      state.userBroker = action.payload;
      state.loading = false;
    },
    setBrokerAndUser: (state: StateT, action: PayloadAction<any>) => {
      state.broker = action.payload.broker;
      state.userBroker = action.payload.user;
      state.loading = false;
    },
    setResponse: (state: StateT, action: PayloadAction<any>) => {
      state.response = action.payload;
      state.loading = false;
    },
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetBroker: (state: StateT) => {
      state.broker = initialState.broker;
    },
    resetUserBroker: (state: StateT) => {
      state.userBroker = initialState.userBroker;
    },
  },
});

export const {
  setUserBrokerList,
  setBroker,
  setUserBroker,
  setBrokerAndUser,
  setLoading,
  setResponse,
  resetBroker,
  resetUserBroker,
} = userBrokerSlice.actions;

export default userBrokerSlice.reducer;

export const validateUserBroker =
  (broker_rut: string, login: string, password: string) =>
  async (dispatch: any) => {
    // axios
    //   .post(
    //     `${config.server}/api/userBroker/validate`,
    //     { broker_rut, login, password },
    //     {
    //       headers: {
    //         id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     dispatch(setBroker(response.data.broker));
    //     dispatch(setUserBroker(response.data.user));
    //   })
    //   .catch((error) => console.log(error));
    dispatch(setLoading(true));

    const { data } = await apiInstance.post(`/userBroker/validate`, {
      broker_rut,
      login,
      password,
    });

    dispatch(setBroker(data.broker));
    dispatch(setUserBroker(data.user));
    dispatch(setBrokerAndUser(data));
  };

export const sendCredentials =
  (broker_rut: string, email: string) => async (dispatch: any) => {
    // const { success, data, error } = await post(`userBroker/sendCredentials`, {
    //   broker_rut,
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

    const { data } = await apiInstance.post(`/userBroker/sendCredentials`, {
      broker_rut,
      email,
    });

    dispatch(setResponse(data));
  };

export const updatePassword =
  (broker_rut: string, email: string, password: string, newPassword: string) =>
  async (dispatch: any) => {
    // const { success, data, error } = await post(`userBroker/updatePassword`, {
    //   broker_rut,
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

    const { data } = await apiInstance.post(`/userBroker/updatePassword`, {
      broker_rut,
      email,
      password,
      newPassword,
    });

    dispatch(setResponse(data));
  };
