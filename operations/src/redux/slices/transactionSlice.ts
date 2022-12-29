import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export type TransactionT = {
  date: string;
  time: string;
  client_name: string;
  product_name: string;
  num_insured: number;
  status: string;
  amount: number;
};

type StateT = {
  list: TransactionT[];
  transaction: TransactionT;
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  transaction: {
    date: "",
    time: "",
    client_name: "",
    product_name: "",
    num_insured: 0,
    status: "",
    amount: 0,
  },
  loading: false,
  error: false,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setTransactionList: (state: any, action: PayloadAction<any>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setTransaction: (state: any, action: PayloadAction<any>) => {
      state.transaction = action.payload;
      state.loading = false;
      state.error = false;
    },
    resetTransaction: (state: any) => {
      state.transaction = initialState.transaction;
      state.loading = false;
      state.error = false;
    },
    resetTransactionList: (state: any) => {
      state.list = initialState.list;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  setLoading,
  setError,
  setTransactionList,
  setTransaction,
  resetTransaction,
  resetTransactionList,
} = transactionSlice.actions;

export default transactionSlice.reducer;

export const getByFilters =
  (
    channel_id: string,
    client_type: string,
    rut: string,
    period_id: string,
    status_id: string
  ) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.post(`/transaction/getByFilters`, {
        channel_id,
        client_type,
        rut,
        period_id,
        status_id,
      });
      dispatch(setTransactionList(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };
