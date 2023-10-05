import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

import { contractor } from "../../interfaces";

type StateT = {
  contractorList: contractor.IContractor[];
  contractor: contractor.IContractor;
  subscriptionItem: contractor.IContractorSubscription;
  processing: boolean;
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  contractorList: [],
  contractor: {
    id: "",
    type: "",
    rut: "",
    fullName: "",
    name: "",
    companyName: "",
    legalRepresentative: "",
    line: "",
    paternalLastName: "",
    maternalLastName: "",
    birthDate: "",
    address: "",
    district: "",
    email: "",
    phone: "",
    quantity: 0,
    subscriptions: [],
    payment: [],
  },
  subscriptionItem: {
    subscription_id: "",
    product_id: "",
    product_name: "",
    frequency: "",
    price: 0,
    currency_code: "",
    createDate: "",
    startDate: "",
    assistances: [],
    insured: [],
  },
  processing: false,
  loading: false,
  error: false,
};

export const contractorSlice = createSlice({
  name: "contractors",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProcessing: (state: StateT, action: PayloadAction<boolean>) => {
      state.processing = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setContractorList: (
      state: StateT,
      action: PayloadAction<contractor.IContractor[]>
    ) => {
      state.contractorList = action.payload;
      state.loading = false;
      state.error = false;
    },
    setContractor: (
      state: StateT,
      action: PayloadAction<contractor.IContractor>
    ) => {
      state.contractor = action.payload;
      state.loading = false;
      state.error = false;
    },
    setSubscriptionItem: (
      state: StateT,
      action: PayloadAction<contractor.IContractorSubscription>
    ) => {
      state.subscriptionItem = action.payload;
      state.loading = false;
      state.error = false;
    },
    resetContractor: (state: StateT) => {
      state.contractor = initialState.contractor;
      state.loading = false;
      state.error = false;
    },
    resetContractorAll: (state: StateT) => {
      state = initialState;
    },
  },
});

export const {
  setProcessing,
  setLoading,
  setError,
  setContractorList,
  setContractor,
  setSubscriptionItem,
  resetContractor,
  resetContractorAll,
} = contractorSlice.actions;

export default contractorSlice.reducer;

export const create =
  (contractor: contractor.IContractor) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      dispatch(setProcessing(true));
      const { data } = await apiInstance.post(`/contractor/create`, contractor);
      dispatch(setContractor(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const getAll =
  (contractorType: string, rut: string, nameLike: string, active: boolean) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.post(`/contractor/getAll`, {
        contractorType,
        rut,
        nameLike,
        active,
      });
      dispatch(setContractorList(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const getById = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/contractor/getById/${id}`);
    dispatch(setContractor(data));
  } catch (e) {
    dispatch(setError(true));
  }
};

export const getByRut =
  (rut: string, type: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.get(
        `/contractor/getByRut/${rut}/${type}`
      );
      dispatch(setContractor(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const getSubscriptionById = (id: number) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(
      `/contractor/getSubscriptionById/${id}`
    );
    dispatch(setSubscriptionItem(data));
  } catch (e) {
    dispatch(setError(true));
  }
};
