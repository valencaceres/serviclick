import { userStore } from "../stores/userStore";

const useUser = () => {
  const {
    usersList,
    usersListChat,
    user,
    isLoading,
    isError,
    error,
  } = userStore((state) => ({
    usersList: state.usersList,
    usersListChat: state.usersListChat,
    user: state.user,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { getUsersChat, getUsers, resetUserLists, validate, resetUserListsChat } =
    userStore();

  return {
    usersListChat,
    usersList,
    user,
    isLoading,
    isError,
    error,
    validate,
    getUsersChat,
    resetUserLists,
    resetUserListsChat,
    getUsers,
  };
};

export default useUser;