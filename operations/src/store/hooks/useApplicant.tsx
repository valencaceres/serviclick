import { applicantStore } from "../zustand/applicantStore";

const useApplicant = () => {
  const { applicant, reset, isLoading, isError, error } = applicantStore(
    (state) => ({
      applicant: state.applicant,
      reset: state.reset,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    })
  );

  const { upsert } = applicantStore.getState();

  return {
    applicant,
    reset,
    isLoading,
    isError,
    error,
    upsert,
  };
};

export default useApplicant;
