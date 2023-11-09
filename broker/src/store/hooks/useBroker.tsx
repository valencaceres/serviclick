import { brokerStore } from "../zustand";

const useBroker = () => {
  const {
    list: brokerList,
    summary,
    familiesList,
    isLoading,
    isError,
    error,
  } = brokerStore((state) => ({
    list: state.list,
    summary: state.summary,
    familiesList: state.familiesList,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { getByUserId, getDetailsByBrokerId, getFamiliesByBrokerId } =
    brokerStore();

  return {
    brokerList,
    summary,
    familiesList,
    isLoading,
    isError,
    error,
    getByUserId,
    getDetailsByBrokerId,
    getFamiliesByBrokerId,
  };
};

export default useBroker;
