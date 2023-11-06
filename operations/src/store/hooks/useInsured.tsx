import { insuredStore } from "../zustand";

const useInsured = () => {
  const {
    list: insuredList,
    insured,
    isLoading: insuredIsLoading,
    isError: insuredIsError,
    error: insuredError,
  } = insuredStore((state) => ({
    list: state.list,
    insured: state.insured,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { getByRutOrName, reset: resetInsured } = insuredStore();

  return {
    insuredList,
    insured,
    insuredIsLoading,
    insuredIsError,
    insuredError,
    getByRutOrName,
    resetInsured,
  };
};

export default useInsured;
