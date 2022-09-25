import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserT = {
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
  phone: string;
  isValid: boolean;
};

export type OptionT = {
  icon: string;
  function: any;
  enabled: boolean;
};

type StateT = {
  user: UserT;
  showMenu: boolean;
  title: string;
  options: OptionT[];
};

const initialState: StateT = {
  user: {
    rut: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    email: "",
    phone: "",
    isValid: false,
  },
  showMenu: false,
  title: "",
  options: [],
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
    setOptions: (state: any, action: PayloadAction<any>) => {
      state.options = action.payload;
    },
    resetAll: (state: any) => {
      state = initialState;
    },
  },
});

export const { setUser, setShowMenu, setTitle, setOptions, resetAll } =
  userSlice.actions;

export default userSlice.reducer;
