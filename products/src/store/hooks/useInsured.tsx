import { shallow } from "zustand/shallow";

import { insuredStore } from "@/store/zustand";

const useInsured = () => {
  const {
    insured,
    isLoading: insuredIsLoading,
    isError: insuredIsError,
    error: insuredError,
  } = insuredStore(
    (state) => ({
      insured: state.insured,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );
  const {
    set: setInsured,
    getByRut: getInsuredByRut,
    reset: resetInsured,
  } = insuredStore();

  return {
    insured,
    insuredIsLoading,
    insuredIsError,
    insuredError,
    setInsured,
    getInsuredByRut,
    resetInsured,
  };
};

export default useInsured;
