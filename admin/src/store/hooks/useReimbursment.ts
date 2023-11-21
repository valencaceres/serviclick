import { reimbursmentStore } from "../zustand";

const useReimbursment = () => {
  const { list, isLoading, isError, error, documents } = reimbursmentStore(
    (state) => ({
      list: state.list,
      documents: state.documents,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    })
  );

  const { getAll, getAttachByCase, updateReimbursment } = reimbursmentStore();

  return {
    list,
    documents,
    getAll,
    getAttachByCase,
    updateReimbursment,
    isLoading,
    isError,
    error,
  };
};

export default useReimbursment;
