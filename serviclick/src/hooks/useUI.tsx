import { setShowMenu, setUser, setTitle } from "../redux/slices/uiSlice";
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

  return { setShowMenuUI, showMenu, setUserUI, user, setTitleUI, title };
};

export default useUI;
