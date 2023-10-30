import { applicantStore } from "../zustand/applicantStore";

const useApplicant = () => {
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
  };
};

export { useApplicant };
