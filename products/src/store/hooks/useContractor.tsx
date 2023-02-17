import { shallow } from "zustand/shallow";

import { contractorStore } from "@/store/zustand";

const useContractor = () => {
  const {
    contractor,
    contractorList,
    isLoading: contractorIsLoading,
    isError: contractorIsError,
    error: contractorError,
  } = contractorStore(
    (state) => ({
      contractor: state.contractor,
      contractorList: state.contractorList,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );
  const {
    setContractor,
    getAll: getAllContractors,
    getByRut: getContractorByRut,
    reset: resetContractor,
  } = contractorStore();

  return {
    contractor,
    contractorList,
    contractorIsLoading,
    contractorIsError,
    contractorError,
    setContractor,
    getAllContractors,
    getContractorByRut,
    resetContractor,
  };
};

export default useContractor;
