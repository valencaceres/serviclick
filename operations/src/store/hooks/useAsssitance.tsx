import { assistanceStore } from "../zustand/index";

const useAssistance = () => {
  const { assistance, isLoading, isError, error } = assistanceStore(
    (state) => ({
      assistance: state.assistance,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    })
  );

  const { getById, uploadDocument } = assistanceStore();

  return {
    assistance,
    isLoading,
    isError,
    error,
    getById,
    uploadDocument,
  };
};

export default useAssistance;
