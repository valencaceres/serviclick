import { paymentStore } from "../zustand";

const useRetail = () => {
  const {
    list: paymentList,
    codeValue,
    isLoading,
    isError,
    error,
  } = paymentStore((state) => ({
    list: state.list,
    codeValue: state.listValue,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { getByRetailId, setListValue, upsert } = paymentStore();

  return {
    paymentList,
    codeValue,
    isLoading,
    isError,
    error,
    setListValue,
    getByRetailId,
    upsert,
  };
};

export default useRetail;
