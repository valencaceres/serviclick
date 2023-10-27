import { retailStore } from "../zustand";

const useRetail = () => {
  const {
    dataLoading: retailDataLoading,
    isLoading: retailIsLoading,
    isError: retailIsError,
    error: retailError,
  } = retailStore((state) => ({
    dataLoading: state.dataLoading,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { setDataLoading: setRetailDataLoading, reset: resetRetail } =
    retailStore();

  return {
    retailDataLoading,
    retailIsLoading,
    retailIsError,
    retailError,
    setRetailDataLoading,
    resetRetail,
  };
};

export default useRetail;
