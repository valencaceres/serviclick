import { caseStore } from "../zustand/caseStore";

const useCase = () => {
  const {
    case: caseValue,
    caseList,
    retailList,
    statusList,
    products,
    caseId,
    assistances,
    isLoading,
    isError,
    error,
  } = caseStore((state) => ({
    case: state.case,
    caseId: state.caseId,
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
    resetCaseId,
  } = caseStore();

  return {
    caseValue,
    caseId,
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
    resetCaseId,
  };
};

export default useCase;
