import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";

type UserT = {
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
};

const initialState: StateT = {
  list: [],
  user: {
    rut: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    email: "",
    phone: "",
    isValid: false,
  },
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserList: (state: any, action: PayloadAction<any>) => {
      state.list = action.payload;
    },
    setUser: (state: any, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    resetUser: (state: any) => {
      state.user = initialState.user;
    },
  },
});

export const { setUserList, setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

export const getAllUsers = () => (dispatch: any) => {
  axios
    .get("https://reqres.in/api/users?per_page=12")
    .then((response) => {
      dispatch(setUserList(response.data.data));
    })
    .catch((error) => console.log(error));
};

export const validateUser =
  (login: string, password: string) => (dispatch: any) => {
    axios
      .post(
        `${config.server}/api/user/validate`,
        { login, password },
        {
          headers: {
            id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
          },
        }
      )
      .then((response) => {
        dispatch(setUser(response.data));
      })
      .catch((error) => console.log(error));
  };
