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
  } = contractorContractor();

  return {
    customer,
    contractor,
    contractorIsLoading,
    getByRutOrName,
    getContractorById,
  };
};

export default useContractor;
