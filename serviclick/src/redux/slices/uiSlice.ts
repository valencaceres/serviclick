import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserT = {
  rut: string;
  name: string;
  email: string;
  phone: string;
  isValid: boolean;
};

type StateT = {
  user: UserT;
  showMenu: boolean;
  title: string;
};

const initialState: StateT = {
  user: { rut: "", name: "", email: "", phone: "", isValid: false },
  showMenu: false,
  title: "",
};

export const userSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    setUser: (state: any, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setShowMenu: (state: any, action: PayloadAction<any>) => {
      state.showMenu = action.payload;
    },
    setTitle: (state: any, action: PayloadAction<any>) => {
      state.title = action.payload;
    },
    resetUser: (state: any) => {
      state.user = initialState.user;
    },
  },
});

export const { setUser, setShowMenu, setTitle, resetUser } = userSlice.actions;

export default userSlice.reducer;
