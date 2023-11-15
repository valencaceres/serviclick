import { shallow } from "zustand/shallow";

import { agentStore } from "@/store/zustand";

const useAgent = () => {
  const {
    process,
    isLoading: agentIsLoading,
    isError: agentIsError,
    error: agentError,
  } = agentStore(
    (state) => ({
      process: state.process,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );

  const { getProcessById, reset: resetAgent } = agentStore();

  return {
    process,
    agentIsLoading,
    agentIsError,
    agentError,
    getProcessById,
    resetAgent,
  };
};

export default useAgent;
