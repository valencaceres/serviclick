import { userStore } from "../zustand/userStore";

const useUser = () => {
  const { usersList, userItem, isLoading, isError, error } = userStore(
    (state) => ({
      usersList: state.usersList,
      userItem: state.userItem,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    })
  );

  const { validate } = userStore();

  return {
    usersList,
    userItem,
    isLoading,
    isError,
    error,
    validate,
  };
};

export default useUser;
