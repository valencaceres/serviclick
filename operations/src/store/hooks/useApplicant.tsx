import { applicantStore } from "../zustand/applicantStore";

const useApplicant = () => {
  const { applicant, isLoading, isError, error } = applicantStore((state) => ({
    applicant: state.applicant,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { upsert } = applicantStore.getState();

  return {
    applicant,
    isLoading,
    isError,
    error,
    upsert,
  };
};

export default useApplicant;
