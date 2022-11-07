import { useEffect } from "react";

import useUI from "./useUI";

import {
  validateUserBroker,
  sendCredentials,
  updatePassword,
  setLoading,
} from "../redux/slices/userBrokerSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useUserBroker = () => {
  const dispatch = useAppDispatch();

  const { setUserUI, setBrokerUI } = useUI();

  const { userBroker, broker, loading, response } = useAppSelector(
    (state) => state.userBrokerSlice
  );

  const validate = (broker_rut: string, login: string, password: string) => {
    dispatch(validateUserBroker(broker_rut, login, password));
  };

  const sendUserBrokerCredentials = (broker_rut: string, email: string) => {
    dispatch(setLoading(true));
    dispatch(sendCredentials(broker_rut, email));
  };

  const updateUserBrokerPassword = (
    broker_rut: string,
    email: string,
    password: string,
    newPassword: string
  ) => {
    dispatch(setLoading(true));
    dispatch(updatePassword(broker_rut, email, password, newPassword));
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
    loading,
    response,
  };
};

export default useUserBroker;
