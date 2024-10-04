import { shallow } from "zustand/shallow";

import { userInsuredStore } from "../stores/userInsuredStore";

const useUserInsured = () => {
  const {
    userInsured,
    isLoading: userInsuredIsLoading,
    isRestored,
    isError: userInsuredIsError,
    error: userInsuredError,
  } = userInsuredStore(
    (state) => ({
      userInsured: state.userInsured,
      isLoading: state.isLoading,
      isRestored: state.isRestored,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );
  const { validate, reset: resetUserInsured, restorePassword } = userInsuredStore();

  return {
    userInsured,
    userInsuredIsLoading,
    isRestored,
    userInsuredIsError,
    userInsuredError,
    validate,
    resetUserInsured,
    restorePassword
  };
};

export default useUserInsured;
