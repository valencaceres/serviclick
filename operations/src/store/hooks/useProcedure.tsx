import { procedureStore } from "../zustand/procedureStore";

const useProcedure = () => {
  const { procedureList, isLoading, isError, error } = procedureStore(
    (state) => ({
      procedureList: state.procedureList,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    })
  );

  const { getAll } = procedureStore();

  return {
    procedureList,
    isLoading,
    isError,
    error,
    getAll,
  };
};

export default useProcedure;
