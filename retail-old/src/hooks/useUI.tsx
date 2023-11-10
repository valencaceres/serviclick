import {
  OptionT,
  FamilyT,
  CustomerTypeT,
  setAgent,
  setRetail,
  setUser,
  setShowMenu,
  setTitle,
  setOptions,
  setDesktop,
  setCustomerType,
  setFamily,
  resetRetail,
  resetUser,
  resetAll,
} from "../redux/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useUI = () => {
  const dispatch = useAppDispatch();

  const {
    showMenu,
    user,
    retail,
    title,
    options,
    customerType,
    family,
    isDesktop,
    agentId,
  } = useAppSelector((state) => state.uiSlice);

  const setAgentUI = (id: string) => {
    dispatch(setAgent(id));
  };

  const setShowMenuUI = (value: boolean) => {
    dispatch(setShowMenu(value));
  };

  const setRetailUI = (value: any) => {
    dispatch(setRetail(value));
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

  const setCustomerTypeUI = (value: CustomerTypeT) => {
    dispatch(setCustomerType(value));
  };

  const setFamilyUI = (value: FamilyT) => {
    dispatch(setFamily(value));
  };

  const resetRetailUI = () => {
    dispatch(resetRetail());
  };

  const resetUserUI = () => {
    dispatch(resetUser());
  };

  const resetUI = () => {
    dispatch(resetAll());
  };

  return {
    setAgentUI,
    setRetailUI,
    setUserUI,
    agentId,
    retail,
    user,
    setShowMenuUI,
    showMenu,
    setTitleUI,
    title,
    setOptionsUI,
    setDesktopUI,
    setCustomerTypeUI,
    setFamilyUI,
    family,
    customerType,
    options,
    isDesktop,
    resetRetailUI,
    resetUserUI,
    resetUI,
  };
};

export default useUI;
