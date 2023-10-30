import { applicantStore } from "../zustand/applicantStore";

const useApplicant = () => {
<<<<<<< HEAD
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
=======
  const {
    caseData,
    isLoading,
    isError,
    error,
    getApplicantByRut,
    upsertApplicant,
  } = applicantStore.getState();

  return {
    caseData,
    isLoading,
    isError,
    error,
    getApplicantByRut,
    upsertApplicant,
>>>>>>> 3ca24ac1e26422b30ecac96c7e4368735a22310f
  };
};

export default useApplicant;
