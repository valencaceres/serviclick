import { brokerStore } from "../zustand";

const useBroker = () => {
  const {
    broker: broker,
    list: brokerList,
    summary,
    familiesList,
    isLoading,
    isError,
    error,
  } = brokerStore((state) => ({
    broker: state.broker,
    list: state.list,
    summary: state.summary,
    familiesList: state.familiesList,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { getByUserId, getDetailsByBrokerId, getFamiliesByBrokerId, getBrokerById } =
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
    getBrokerById
  };
};

export default useBroker;
