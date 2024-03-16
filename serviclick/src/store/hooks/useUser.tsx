import { userStore } from "../zustand/userStore";

const useUserStore = () => {
  const {
    usersList,
    usersListChat,

    isLoading,
    isError,
    error,
  } = userStore((state) => ({
    usersList: state.usersList,
    usersListChat: state.usersListChat,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { getUsersChat, getUsers, resetUserLists, resetUserListsChat } =
    userStore();

  return {
    usersListChat,
    usersList,
    isLoading,
    isError,
    error,

    getUsersChat,
    resetUserLists,
    resetUserListsChat,
    getUsers,
  };
};

export default useUserStore;
