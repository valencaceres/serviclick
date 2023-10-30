import { caseStore } from "../zustand/caseStore";

const useCase = () => {
  const {
    case: caseValue,
    caseList,
    retailList,
    statusList,
    products,
    assistances,
    isLoading,
    isError,
    error,
  } = caseStore((state) => ({
    case: state.case,
    caseList: state.caseList,
    retailList: state.retailList,
    statusList: state.statusList,
    products: state.products,
    assistances: state.assistances,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
    setCase,
    getRetails,
    getStatus,
    getAll,
    getById,
    getServicesAndValues,
    getApplicantByRut,
    upsert,
    resetNoRut,
    reset,
  } = caseStore();

  return {
    caseValue,
    caseList,
    retailList,
    statusList,
    products,
    assistances,
    isLoading,
    isError,
    error,
    setCase,
    getRetails,
    getStatus,
    getAll,
    getById,
    getServicesAndValues,
    getApplicantByRut,
    upsert,
    resetNoRut,
    reset,
  };
};

export default useCase;
