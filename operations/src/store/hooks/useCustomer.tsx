import { customerStore } from "../zustand";

const useCustomer = () => {
  const {
    list: customerList,
    customer,
    isLoading: customerIsLoading,
    isError: customerIsError,
    error: customerError,
  } = customerStore((state) => ({
    list: state.list,
    customer: state.customer,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { getByRutOrName, reset: resetCustomer } = customerStore();

  return {
    customerList,
    customer,
    customerIsLoading,
    customerIsError,
    customerError,
    getByRutOrName,
    resetCustomer,
  };
};

export default useCustomer;
