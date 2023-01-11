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
  filters: any;
  isDesktop: boolean;
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
  filters: null,
  isDesktop: false,
};

export const userSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    setUser: (state: StateT, action: PayloadAction<UserT>) => {
      state.user = action.payload;
    },
    setShowMenu: (state: StateT, action: PayloadAction<boolean>) => {
      state.showMenu = action.payload;
    },
    setTitle: (state: StateT, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setOptions: (state: StateT, action: PayloadAction<OptionT[]>) => {
      state.options = action.payload;
    },
    setDesktop: (state: StateT, action: PayloadAction<boolean>) => {
      state.isDesktop = action.payload;
    },
    setFilters: (state: StateT, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
    resetAll: (state: StateT) => {
      state = initialState;
    },
  },
});

export const {
  setUser,
  setShowMenu,
  setTitle,
  setOptions,
  setDesktop,
  setFilters,
  resetAll,
} = userSlice.actions;

export default userSlice.reducer;
