import { caseStore } from "../zustand/caseStore";

const useCase = () => {
  const {
    caseValue,
    caseData,
    caseList,
    retailList,
    statusList,

    isLoading,
    isError,
    error,
  } = caseStore((state) => ({
    caseValue: state.caseValue,
    caseData: state.caseData,
    caseList: state.caseList,
    retailList: state.retailList,
    statusList: state.statusList,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
    getRetails,
    getStatus,
    getAll,
    getById,
    getServicesAndValues,
    upsert,
    reset,
  } = caseStore();

  return {
    caseValue,
    caseData,
    caseList,
    retailList,
    statusList,
    isLoading,
    isError,
    error,
    getRetails,
    getStatus,
    getAll,
    getById,
    getServicesAndValues,
    upsert,
    reset,
  };
};

export { useCase };
