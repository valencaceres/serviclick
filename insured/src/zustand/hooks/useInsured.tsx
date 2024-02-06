import { shallow } from "zustand/shallow";

import { insuredStore } from "../stores/insuredStore";

const useInsured = () => {
  const {
    profile: insuredProfile,
    beneficiaryList,
    isLoading: insuredIsLoading,
    isError: insuredIsError,
    error: insuredError,
  } = insuredStore(
    (state) => ({
      profile: state.profile,
      beneficiaryList: state.beneficiaryList,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );
  const {
    getProfile,
    reset: resetInsured,
    setBeneficiaryList,
  } = insuredStore();

  return {
    insuredProfile,
    insuredIsLoading,
    beneficiaryList,
    insuredIsError,
    insuredError,
    getProfile,
    setBeneficiaryList,
    resetInsured,
  };
};

export default useInsured;
