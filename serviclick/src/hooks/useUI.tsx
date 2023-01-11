import {
  OptionT,
  setUser,
  setShowMenu,
  setTitle,
  setOptions,
  setDesktop,
  setFilters,
  resetAll,
} from "../redux/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useUI = () => {
  const dispatch = useAppDispatch();

  const { showMenu, user, title, options, filters, isDesktop } = useAppSelector(
    (state) => state.uiSlice
  );

  const setShowMenuUI = (value: boolean) => {
    dispatch(setShowMenu(value));
  };

  const setUserUI = (value: any) => {
    dispatch(setUser(value));
  };

  const setTitleUI = (value: string) => {
    dispatch(setTitle(value));
  };

  const setOptionsUI = (value: OptionT[]) => {
    dispatch(setOptions(value));
  };

  const setDesktopUI = (value: boolean) => {
    dispatch(setDesktop(value));
  };

  const setFiltersUI = (value: any) => {
    dispatch(setFilters(value));
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
    setOptionsUI,
    setDesktopUI,
    setFiltersUI,
    options,
    filters,
    isDesktop,
    resetUI,
  };
};

export default useUI;
