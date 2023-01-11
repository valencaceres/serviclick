import shallow from "zustand/shallow";
import { uiStore } from "../store/uiStore";

const useUI = () => {
  const {
    ui,
    loading: uiLoading,
    error: uiError,
  } = uiStore(
    (state) => ({
      ui: state.ui,
      loading: state.loading,
      error: state.error,
    }),
    shallow
  );
  const { setUI, reset: resetUI } = uiStore();

  return {
    ui,
    uiLoading,
    uiError,
    setUI,
    resetUI,
  };
};

export default useUI;
