import { shallow } from "zustand/shallow";

import { userInsuredStore } from "../stores/userInsuredStore";

const useUserInsured = () => {
  const {
    userInsured,
    isLoading: userInsuredIsLoading,
    isError: userInsuredIsError,
    error: userInsuredError,
  } = userInsuredStore(
    (state) => ({
      userInsured: state.userInsured,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );
  const { validate, reset: resetUserInsured } = userInsuredStore();

  return {
    userInsured,
    userInsuredIsLoading,
    userInsuredIsError,
    userInsuredError,
    validate,
    resetUserInsured,
  };
};

export default useUserInsured;
