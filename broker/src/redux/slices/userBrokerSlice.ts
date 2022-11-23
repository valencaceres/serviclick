import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

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
  error: boolean;
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
  error: false,
  response: null,
};

export const userBrokerSlice = createSlice({
  name: "userBrokers",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setUserBrokerList: (
      state: StateT,
      action: PayloadAction<UserBrokerT[]>
    ) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setBroker: (state: StateT, action: PayloadAction<BrokerT>) => {
      state.broker = action.payload;
      state.loading = false;
      state.error = false;
    },
    setUserBroker: (state: StateT, action: PayloadAction<UserBrokerT>) => {
      state.userBroker = action.payload;
      state.loading = false;
      state.error = false;
    },
    setBrokerAndUser: (state: StateT, action: PayloadAction<any>) => {
      state.broker = action.payload.broker;
      state.userBroker = action.payload.user;
      state.loading = false;
      state.error = false;
    },
    setResponse: (state: StateT, action: PayloadAction<any>) => {
      state.response = action.payload;
      state.loading = false;
      state.error = false;
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
  setLoading,
  setError,
  setUserBrokerList,
  setBroker,
  setUserBroker,
  setBrokerAndUser,
  setResponse,
  resetBroker,
  resetUserBroker,
} = userBrokerSlice.actions;

export default userBrokerSlice.reducer;

export const validateUserBroker =
  (broker_rut: string, login: string, password: string) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));

      const { data } = await apiInstance.post(`/userBroker/validate`, {
        broker_rut,
        login,
        password,
      });

      dispatch(setBroker(data.broker));
      dispatch(setUserBroker(data.user));
      dispatch(setBrokerAndUser(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const sendCredentials =
  (broker_rut: string, email: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));

      const { data } = await apiInstance.post(`/userBroker/sendCredentials`, {
        broker_rut,
        email,
      });

      dispatch(setResponse(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const updatePassword =
  (broker_rut: string, email: string, password: string, newPassword: string) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));

      const { data } = await apiInstance.post(`/userBroker/updatePassword`, {
        broker_rut,
        email,
        password,
        newPassword,
      });

      dispatch(setResponse(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };
