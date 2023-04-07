import { shallow } from "zustand/shallow";

import { uiStore } from "../stores/uiStore";

const useUI = () => {
  const { ui } = uiStore(
    (state) => ({
      ui: state.ui,
    }),
    shallow
  );
  const {
    setTitle,
    setShowButtonBack,
    setIsDesktop,
    reset: resetUI,
  } = uiStore();

  return {
    ui,
    setTitle,
    setShowButtonBack,
    setIsDesktop,
    resetUI,
  };
};

export default useUI;
