import { caseStore } from "../zustand/caseStore";

const useCase = () => {
  const { data, isLoading, isError, error } = caseStore((state) => ({
    data: state.data,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
    getBeneficiaryData: getBeneficiaryByRut,
    isLoading: beneficiaryIsLoading,
  } = caseStore();

  return {
    data,
    getBeneficiaryByRut,
    beneficiaryIsLoading,
  };
};

export { useCase };
