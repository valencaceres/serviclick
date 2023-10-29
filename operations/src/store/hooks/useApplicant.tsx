import { applicantStore } from "../zustand/applicantStore";

const useApplicant = () => {
  const { data, isLoading, isError, error, getApplicantData, upsertApplicant } =
    applicantStore.getState();

  return {
    data,
    isLoading,
    isError,
    error,
    getApplicantData,
    upsertApplicant,
  };
};

export { useApplicant };
