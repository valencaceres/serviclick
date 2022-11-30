import { useEffect, useState } from "react";

import useUI from "./useUI";

import * as User from "../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useUser = () => {
  const dispatch = useAppDispatch();

  const { setUserUI } = useUI();

  const [isValidate, setIsValidate] = useState(false);

  const {
    user,
    list: userList,
    loading: userLoading,
    error: userError,
  } = useAppSelector((state) => state.userSlice);

  const createUser = (user: User.UserT) => {
    dispatch(User.createUser(user));
  };

  const deleteUserById = (id: string) => {
    dispatch(User.deleteUserById(id));
  };

  const validateUser = (login: string, password: string) => {
    setIsValidate(true);
    dispatch(User.validateUser(login, password));
  };

  const sendCredentials = (email: string) => {
    dispatch(User.sendCredentials(email));
  };

  const updatePassword = (
    email: string,
    password: string,
    newPassword: string
  ) => {
    dispatch(User.updatePassword(email, password, newPassword));
  };

  const getUserByRut = (rut: string) => {
    dispatch(User.getUserByRut(rut));
  };

  const getUserByEmail = (email: string) => {
    dispatch(User.getUserByEmail(email));
  };

  const getAllUsers = () => {
    dispatch(User.getAll());
  };

  const resetUser = () => {
    dispatch(User.resetUser());
  };

  const setUser = (user: User.UserT) => {
    dispatch(User.setUser(user));
  };

  useEffect(() => {
    if (user.rut !== "" && isValidate) {
      setUserUI(user);
    }
  }, [isValidate, setUserUI, user, user.rut]);

  return {
    user,
    userList,
    userLoading,
    userError,
    createUser,
    deleteUserById,
    validateUser,
    sendCredentials,
    updatePassword,
    getUserByRut,
    getUserByEmail,
    getAllUsers,
    resetUser,
    setUser,
  };
};

export default useUser;
