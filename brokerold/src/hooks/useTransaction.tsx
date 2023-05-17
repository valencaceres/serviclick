import * as Transaction from "../redux/slices/transactionSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useTransaction = () => {
  const dispatch = useAppDispatch();

  const { transaction, list: transactionList } = useAppSelector(
    (state) => state.transactionSlice
  );

  const getByFilters = (
    channel_id: string,
    client_type: string,
    rut: string,
    period_id: string,
    status_id: string
  ) => {
    dispatch(
      Transaction.getByFilters(
        channel_id,
        client_type,
        rut,
        period_id,
        status_id
      )
    );
  };

  const setTransactionList = (value: Transaction.TransactionT[]) => {
    dispatch(Transaction.setTransactionList(value));
  };

  const setTransaction = (value: Transaction.TransactionT) => {
    dispatch(Transaction.setTransaction(value));
  };

  const resetTransaction = () => {
    dispatch(Transaction.resetTransaction());
  };

  const resetTransactionList = () => {
    dispatch(Transaction.resetTransactionList());
  };

  return {
    getByFilters,
    setTransactionList,
    setTransaction,
    resetTransaction,
    resetTransactionList,
    transaction,
    transactionList,
  };
};

export default useTransaction;
