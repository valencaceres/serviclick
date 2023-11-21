import { userStore } from "../zustand";

const useUser = () => {
  const { list, user, isLoading, isError, error } = userStore((state) => ({
    list: state.list,
    user: state.user,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { getUsers, getUserByid, updateUser, deleteUser, createUser } =
    userStore();

  return {
    list,
    user,
    isLoading,
    isError,
    error,
    getUsers,
    getUserByid,
    updateUser,
    deleteUser,
    createUser,
  };
};

export default useUser;
