import { caseStore } from "../zustand/caseStore";

const useCase = () => {
  const {
    case: caseValue,
    caseList,
    applicant,
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
    applicant: state.applicant,
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
    upsertApplicant,
    resetNoRut,
    reset,
    resetApplicant,
    resetCaseId,
  } = caseStore();

  return {
    caseValue,
    caseId,
    applicant,
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
    upsertApplicant,
    resetNoRut,
    reset,
    resetApplicant,
    resetCaseId,
  };
};

export default useCase;
