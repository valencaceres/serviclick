import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";
import { apiInstance } from "~/utils/api";

export type TransactionT = {
  date: string;
  time: string;
  client_name: string;
  product_name: string;
  num_insured: number;
  status: string;
  amount: number;
  subscription_id:string,
  subscription_table_id:string
};

type StateT = {
  list: TransactionT[];
  transaction: TransactionT;
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
    subscription_id: "",
    subscription_table_id: "",
  },
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactionList: (state: any, action: PayloadAction<any>) => {
      state.list = action.payload;
    },
    setTransaction: (state: any, action: PayloadAction<any>) => {
      state.transaction = action.payload;
    },
    resetTransaction: (state: any) => {
      state.transaction = initialState.transaction;
    },
    resetTransactionList: (state: any) => {
      state.list = initialState.list;
    },
  },
});

export const {
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
      const { data } = await apiInstance.post(`/transaction/getByFilters`, {
        channel_id,
        client_type,
        rut,
        period_id,
        status_id,
      });
      dispatch(setTransactionList(data));
    } catch (error) {
      console.log(error);
    }
  };
