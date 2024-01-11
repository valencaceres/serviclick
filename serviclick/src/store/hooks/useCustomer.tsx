import { customerStore } from "../zustand";

const useCustomer = () => {
  const {
    list: customerList,
    customer,
    product,
    contractor,
    isLoading: customerIsLoading,
    isError: customerIsError,
    error: customerError,
  } = customerStore((state) => ({
    list: state.list,
    product: state.product,
    contractor: state.contractor,
    customer: state.customer,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
    getByRutOrName,
    reset: resetCustomer,
    getContractorById,
    selectProduct,
    resetContractor
  } = customerStore();

  return {
    customerList,
    customer,
    product,
    contractor,
    customerIsLoading,
    customerIsError,
    customerError,
    getByRutOrName,
    getContractorById,
    selectProduct,
    resetCustomer,
    resetContractor
  };
};

export default useCustomer;
