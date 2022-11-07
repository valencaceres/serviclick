import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { post } from "../../utils/api";

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
    },
    setUserBroker: (state: StateT, action: PayloadAction<UserBrokerT>) => {
      state.userBroker = action.payload;
    },
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setResponse: (state: StateT, action: PayloadAction<any>) => {
      state.response = action.payload;
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
  setLoading,
  setResponse,
  resetBroker,
  resetUserBroker,
} = userBrokerSlice.actions;

export default userBrokerSlice.reducer;

export const validateUserBroker =
  (broker_rut: string, login: string, password: string) => (dispatch: any) => {
    axios
      .post(
        `${config.server}/api/userBroker/validate`,
        { broker_rut, login, password },
        {
          headers: {
            id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
          },
        }
      )
      .then((response) => {
        dispatch(setBroker(response.data.broker));
        dispatch(setUserBroker(response.data.user));
      })
      .catch((error) => console.log(error));
  };

export const sendCredentials =
  (broker_rut: string, email: string) => async (dispatch: any) => {
    const { success, data, error } = await post(`userBroker/sendCredentials`, {
      broker_rut,
      email,
    });

    if (!success) {
      console.log(error);
      return false;
    }

    dispatch(setResponse(data));
    dispatch(setLoading(false));
    return true;
  };

export const updatePassword =
  (broker_rut: string, email: string, password: string, newPassword: string) =>
  async (dispatch: any) => {
    const { success, data, error } = await post(`userBroker/updatePassword`, {
      broker_rut,
      email,
      password,
      newPassword,
    });

    if (!success) {
      console.log(error);
      return false;
    }

    dispatch(setResponse(data));
    dispatch(setLoading(false));
    return true;
  };
