import { stageStore } from "../zustand/stageStore";

const useStage = () => {
  const { stageList, isLoading, isError, error } = stageStore((state) => ({
    stageList: state.stageList,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { getAll } = stageStore();

  return {
    stageList,
    isLoading,
    isError,
    error,
    getAll,
  };
};

export default useStage;
