import { customerStore } from "../zustand";

const useCustomer = () => {
  const {
    list: customerList,
    customer,
    product,
    beneficiaryList,
    contractor,
    isLoading: customerIsLoading,
    isError: customerIsError,
    error: customerError,
  } = customerStore((state) => ({
    list: state.list,
    product: state.product,
    beneficiaryList: state.beneficiaryList,
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
    setBeneficiaryList,
    resetContractor,
  } = customerStore();

  return {
    customerList,
    customer,
    product,
    beneficiaryList,
    contractor,
    customerIsLoading,
    customerIsError,
    customerError,
    getByRutOrName,
    getContractorById,
    setBeneficiaryList,
    selectProduct,
    resetCustomer,
    resetContractor,
  };
};

export default useCustomer;
