import { transactionStore } from "../zustand";

const useAgent = () => {
  const {
    transaction: transaction,
    isLoading: isLoading,
    isError: isError,
    error: error,
  } = transactionStore((state) => ({
    transaction: state.transaction,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
    getTransactionById,
    resetTransaction,
    updateAmount,
    updateDate,
    updateStatus,
    changeMethod,
  } = transactionStore();

  return {
    transaction,
    isLoading,
    isError,
    error,
    getTransactionById,
    resetTransaction,
    updateAmount,
    updateDate,
    changeMethod,
    updateStatus,
  };
};

export default useAgent;
