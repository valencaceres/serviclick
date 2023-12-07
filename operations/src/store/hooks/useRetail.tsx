import { retailStore } from "../zustand";

const useRetail = () => {
  const {
    dataLoading: retailDataLoading,
    retailList: retailList,
    isLoading: retailIsLoading,
    isError: retailIsError,
    error: retailError,
  } = retailStore((state) => ({
    retailList: state.list,
    dataLoading: state.dataLoading,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
    setDataLoading: setRetailDataLoading,
    reset: resetRetail,
    getAll,
  } = retailStore();

  return {
    retailList,
    retailDataLoading,
    retailIsLoading,
    retailIsError,
    retailError,
    setRetailDataLoading,
    resetRetail,
    getAll,
  };
};

export default useRetail;
