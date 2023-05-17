import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { get } from "../../utils/api";

export type BeneficiaryT = {
  id: string;
  rut: string;
  birthDate: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  address: string;
  district: string;
  email: string;
  phone: string;
};

type StateT = {
  list: BeneficiaryT[];
  beneficiary: BeneficiaryT;
  loading: boolean;
};

const initialState: StateT = {
  list: [],
  beneficiary: {
    id: "",
    rut: "",
    birthDate: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    address: "",
    district: "",
    email: "",
    phone: "",
  },
  loading: false,
};

export const beneficiarySlice = createSlice({
  name: "beneficiary",
  initialState,
  reducers: {
    setBeneficiaryList: (
      state: StateT,
      action: PayloadAction<BeneficiaryT[]>
    ) => {
      state.list = action.payload;
    },
    setBeneficiary: (state: StateT, action: PayloadAction<BeneficiaryT>) => {
      state.beneficiary = action.payload;
    },
    addBeneficiary: (state: StateT, action: PayloadAction<BeneficiaryT>) => {
      state.list = [
        ...state.list.filter(
          (item: BeneficiaryT) => item.rut !== action.payload.rut
        ),
        action.payload,
      ];
    },
    deleteBeneficiary: (state: StateT, action: PayloadAction<string>) => {
      state.list = [
        ...state.list.filter(
          (item: BeneficiaryT) => item.rut !== action.payload
        ),
      ];
    },
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetBeneficiary: (state: StateT) => {
      state.beneficiary = initialState.beneficiary;
    },
    reset: (state: StateT) => {
      state = initialState;
    },
  },
});

export const {
  setBeneficiaryList,
  setBeneficiary,
  addBeneficiary,
  deleteBeneficiary,
  setLoading,
  resetBeneficiary,
  reset,
} = beneficiarySlice.actions;

export default beneficiarySlice.reducer;

export const getByRut = (rut: string) => async (dispatch: any) => {
  const { success, data, error } = await get(`beneficiary/getByRut/${rut}`);

  if (!success) {
    console.log(error);
    return false;
  }

  dispatch(setBeneficiary(data));
  dispatch(setLoading(false));
  return true;
};
