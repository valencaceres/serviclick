import { retailsStore } from "../zustand/RetailsStore";

const useStage = () => {
  const { retailList, isLoading, isError, error } = retailsStore((state) => ({
    retailList: state.retailList,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { getAll } = retailsStore();

  return {
    retailList,
    isLoading,
    isError,
    error,
    getAll,
  };
};

export default useStage;
