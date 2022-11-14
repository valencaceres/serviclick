import { useEffect } from "react";

import useUI from "./useUI";

import { validateUser } from "../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useUser = () => {
  const dispatch = useAppDispatch();

  const { setUserUI } = useUI();

  const { user } = useAppSelector((state) => state.userSlice);

  const validate = (login: string, password: string) => {
    dispatch(validateUser(login, password));
  };

  useEffect(() => {
    if (user.rut !== "") {
      setUserUI(user);
    }
  }, [setUserUI, user, user.rut]);

  return { validate };
};

export default useUser;
