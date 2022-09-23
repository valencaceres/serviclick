import {
  setUser,
  setShowMenu,
  setTitle,
  resetAll,
} from "../redux/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useUI = () => {
  const dispatch = useAppDispatch();

  const { showMenu, user, title } = useAppSelector((state) => state.uiSlice);

  const setShowMenuUI = (value: boolean) => {
    dispatch(setShowMenu(value));
  };

  const setUserUI = (value: any) => {
    dispatch(setUser(value));
  };

  const setTitleUI = (value: string) => {
    dispatch(setTitle(value));
  };

  const resetUI = (value: any) => {
    dispatch(resetAll());
  };

  return {
    setUserUI,
    user,
    setShowMenuUI,
    showMenu,
    setTitleUI,
    title,
    resetUI,
  };
};

export default useUI;
