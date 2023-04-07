import { shallow } from "zustand/shallow";

import { insuredStore } from "../stores/insuredStore";

const useInsured = () => {
  const {
    profile: insuredProfile,
    isLoading: insuredIsLoading,
    isError: insuredIsError,
    error: insuredError,
  } = insuredStore(
    (state) => ({
      profile: state.profile,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );
  const { getProfile, reset: resetInsured } = insuredStore();

  return {
    insuredProfile,
    insuredIsLoading,
    insuredIsError,
    insuredError,
    getProfile,
    resetInsured,
  };
};

export default useInsured;
