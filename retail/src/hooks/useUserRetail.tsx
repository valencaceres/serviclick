import { useEffect } from "react";

import useUI from "./useUI";

import {
  validateUserRetail,
  sendCredentials,
  updatePassword,
  setLoading,
} from "../redux/slices/userRetailSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useUserRetail = () => {
  const dispatch = useAppDispatch();

  const { setUserUI, setRetailUI } = useUI();

  const { userRetail, retail, loading, response } = useAppSelector(
    (state) => state.userRetailSlice
  );

  const validate = (retail_rut: string, login: string, password: string) => {
    dispatch(validateUserRetail(retail_rut, login, password));
  };

  const sendUserRetailCredentials = (retail_rut: string, email: string) => {
    dispatch(setLoading(true));
    dispatch(sendCredentials(retail_rut, email));
  };

  const updateUserRetailPassword = (
    retail_rut: string,
    email: string,
    password: string,
    newPassword: string
  ) => {
    dispatch(setLoading(true));
    dispatch(updatePassword(retail_rut, email, password, newPassword));
  };

  useEffect(() => {
    if (userRetail.rut !== "") {
      setUserUI(userRetail);
      setRetailUI(retail);
    }
  }, [setUserUI, userRetail, userRetail.rut]);

  return {
    validate,
    sendUserRetailCredentials,
    updateUserRetailPassword,
    loading,
    response,
  };
};

export default useUserRetail;
