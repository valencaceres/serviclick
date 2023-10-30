import { qualificationStore } from "../zustand/qualificationStore";

const useQualification = () => {
  const { qualificationList, isLoading, isError, error } = qualificationStore(
    (state) => ({
      qualificationList: state.qualificationList,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    })
  );

  const { getAll } = qualificationStore();

  return {
    qualificationList,
    isLoading,
    isError,
    error,
    getAll,
  };
};

export default useQualification;
