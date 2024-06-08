import { retailStore } from "../zustand";

const useRetail = () => {
  const {
    retail64: retail64,
    list: retailList,
    summary,
    familiesList,
    isLoading,
    isError,
    error,
  } = retailStore((state) => ({
    retail64: state.retail64,
    list: state.list,
    summary: state.summary,
    familiesList: state.familiesList,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { getByUserId, getDetailsByRetailId, getFamiliesByRetailId, getSalesMultiHogar } =
    retailStore();

  return {
    retail64,
    retailList,
    summary,
    familiesList,
    isLoading,
    isError,
    error,
    getByUserId,
    getDetailsByRetailId,
    getFamiliesByRetailId,
    getSalesMultiHogar
  };
};

export default useRetail;
