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
    validateUser,
    sendCredentials,
    updatePassword,
  };
};

export default useUser;
