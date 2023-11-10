import { retailStore } from "../zustand";

const useRetail = () => {
  const {
    list: retailList,
    summary,
    familiesList,
    isLoading,
    isError,
    error,
  } = retailStore((state) => ({
    list: state.list,
    summary: state.summary,
    familiesList: state.familiesList,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { getByUserId, getDetailsByRetailId, getFamiliesByRetailId } =
    retailStore();

  return {
    retailList,
    summary,
    familiesList,
    isLoading,
    isError,
    error,
    getByUserId,
    getDetailsByRetailId,
    getFamiliesByRetailId,
  };
};

export default useRetail;
