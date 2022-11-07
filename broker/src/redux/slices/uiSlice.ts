import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BrokerT = {
  id: string;
  rut: string;
  name: string;
  logo: string;
};

type UserT = {
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
  profileCode: string;
  profileName: string;
};

export type OptionT = {
  icon: string;
  function: any;
  enabled: boolean;
};

export type FamilyT = {
  id: string;
  icon: string;
  name: string;
};

export type CustomerTypeT = "P" | "C";

type StateT = {
  broker: BrokerT;
  user: UserT;
  customerType: CustomerTypeT;
  showMenu: boolean;
  title: string;
  options: OptionT[];
  family: FamilyT;
  isDesktop: boolean;
};

const initialState: StateT = {
  broker: {
    id: "",
    rut: "",
    name: "",
    logo: "",
  },
  user: {
    rut: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    email: "",
    profileCode: "",
    profileName: "",
  },
  customerType: "P",
  showMenu: false,
  title: "",
  options: [],
  family: {
    id: "",
    icon: "",
    name: "",
  },
  isDesktop: false,
};

export const userSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    setUser: (state: StateT, action: PayloadAction<UserT>) => {
      state.user = action.payload;
    },
    setBroker: (state: StateT, action: PayloadAction<BrokerT>) => {
      state.broker = action.payload;
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
    setCustomerType: (state: StateT, action: PayloadAction<CustomerTypeT>) => {
      state.customerType = action.payload;
    },
    setFamily: (state: StateT, action: PayloadAction<FamilyT>) => {
      state.family = action.payload;
    },
    resetUser: (state: StateT) => {
      state.user = initialState.user;
    },
    resetBroker: (state: StateT) => {
      state.broker = initialState.broker;
    },
    resetAll: (state: StateT) => {
      state = initialState;
    },
  },
});

export const {
  setBroker,
  setUser,
  setShowMenu,
  setTitle,
  setOptions,
  setDesktop,
  setCustomerType,
  setFamily,
  resetBroker,
  resetUser,
  resetAll,
} = userSlice.actions;

export default userSlice.reducer;
