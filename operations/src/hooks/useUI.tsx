import * as UISlice from '../redux/slices/uiSlice';

import { useAppDispatch, useAppSelector } from '../redux/hooks';

interface UseUII {
  user: UISlice.UserT;
  showMenu: boolean;
  title: string;
  options: UISlice.OptionT[];
  filters: any;
  isDesktop: boolean;
  envApp: 'dev' | 'prod';
  setEnvAppUI: any;
  setUserUI: any;
  setShowMenuUI: any;
  setTitleUI: any;
  setOptionsUI: any;
  setDesktopUI: any;
  setFiltersUI: any;
  resetUI: any;
}

const useUI = (): UseUII => {
  const dispatch = useAppDispatch();

  const { showMenu, user, title, options, isDesktop, filters, envApp } =
    useAppSelector((state) => state.uiSlice);

  const setShowMenuUI = (value: boolean) => {
    dispatch(UISlice.setShowMenu(value));
  };

  const setEnvAppUI = (value: UISlice.EnvAppT) => {
    dispatch(UISlice.setEnv(value));
  };

  const setUserUI = (value: any) => {
    dispatch(UISlice.setUser(value));
  };

  const setTitleUI = (value: string) => {
    dispatch(UISlice.setTitle(value));
  };

  const setOptionsUI = (value: UISlice.OptionT[]) => {
    dispatch(UISlice.setOptions(value));
  };

  const setDesktopUI = (value: boolean) => {
    dispatch(UISlice.setDesktop(value));
  };

  const setFiltersUI = (value: any) => {
    dispatch(UISlice.setFilters(value));
  };

  const resetUI = () => {
    dispatch(UISlice.resetAll());
  };

  return {
    user,
    showMenu,
    title,
    options,
    filters,
    isDesktop,
    envApp,
    setEnvAppUI,
    setUserUI,
    setShowMenuUI,
    setTitleUI,
    setOptionsUI,
    setDesktopUI,
    setFiltersUI,
    resetUI,
  };
};

export default useUI;
