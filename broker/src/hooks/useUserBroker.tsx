import { useEffect } from "react";

import useUI from "./useUI";

import * as UserBroker from "../redux/slices/userBrokerSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useUserBroker = () => {
  const dispatch = useAppDispatch();

  const { setUserUI, setBrokerUI } = useUI();

  const {
    userBroker,
    broker,
    loading: userBrokerLoading,
    error: userBrokerError,
    response,
  } = useAppSelector((state) => state.userBrokerSlice);

  const validate = (broker_rut: string, login: string, password: string) => {
    dispatch(UserBroker.validateUserBroker(broker_rut, login, password));
  };

  const sendUserBrokerCredentials = (broker_rut: string, email: string) => {
    dispatch(UserBroker.sendCredentials(broker_rut, email));
  };

  const updateUserBrokerPassword = (
    broker_rut: string,
    email: string,
    password: string,
    newPassword: string
  ) => {
    dispatch(
      UserBroker.updatePassword(broker_rut, email, password, newPassword)
    );
  };

  useEffect(() => {
    if (userBroker.rut !== "") {
      setUserUI(userBroker);
      setBrokerUI(broker);
    }
  }, [setUserUI, userBroker, userBroker.rut]);

  return {
    validate,
    sendUserBrokerCredentials,
    updateUserBrokerPassword,
    userBrokerLoading,
    userBrokerError,
    response,
  };
};

export default useUserBroker;
