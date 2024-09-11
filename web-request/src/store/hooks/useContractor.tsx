import { contractorContractor } from "../contractorStore";

const useContractor = () => {
  const {
    customer,
    contractor,
    isLoading: contractorIsLoading,
    isError: contractorIsError,
  } = contractorContractor((state) => ({
    contractor: state.contractor,
    customer: state.customer,
    isLoading: state.isLoading,
    isError: state.isError,
  }));

  const {
    getByRutOrName,
    getContractorById,
    reset
  } = contractorContractor();

  return {
    customer,
    contractor,
    contractorIsLoading,
    contractorIsError,
    getByRutOrName,
    getContractorById,
    reset
  };
};

export default useContractor;
