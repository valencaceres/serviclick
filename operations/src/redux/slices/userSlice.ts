import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

type UserT = {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
  phone: string;
  isValid: boolean;
};

type StateT = {
  list: UserT[];
  user: UserT;
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  user: {
    id: "",
    rut: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    email: "",
    phone: "",
    isValid: false,
  },
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setUserList: (state: StateT, action: PayloadAction<UserT[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setUser: (state: StateT, action: PayloadAction<UserT>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    },
    resetUser: (state: StateT) => {
      state.user = initialState.user;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { setLoading, setError, setUserList, setUser, resetUser } =
  userSlice.actions;

export default userSlice.reducer;

export const validateUser =
  (login: string, password: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.post(`/user/validate`, {
        login,
        password,
      });
      dispatch(setUser(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const sendCredentials = (email: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.post(`/user/sendCredentials`, {
      email,
    });
    dispatch(setUser(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const updatePassword =
  (email: string, password: string, newPassword: string) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.post(`/user/updatePassword`, {
        email,
        password,
        newPassword,
      });
      dispatch(setUser(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };
