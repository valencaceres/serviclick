import shallow from "zustand/shallow";

import { uiStore } from "../zustand";

const useUI = () => {
  const {
    ui,
    loading: uiLoading,
    error: uiError,
  } = uiStore(
    (state) => ({
      ui: state.ui,
      loading: state.isLoading,
      error: state.error,
    }),
    shallow
  );
  const {
    setSlugCode,
    setTitle,
    setStageAndPlan,
    setLeadId,
    setUI,
    reset: resetUI,
  } = uiStore();

  return {
    ui,
    uiLoading,
    uiError,
    setSlugCode,
    setTitle,
    setStageAndPlan,
    setLeadId,
    setUI,
    resetUI,
  };
};

export default useUI;
