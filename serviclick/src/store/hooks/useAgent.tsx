import { agentStore } from "../zustand";

const useAgent = () => {
  const {
    agent: agent,
    isLoading: isLoading,
    isError: isError,
    error: error,
  } = agentStore((state) => ({
    agent: state.agent,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const { getAgentById, resetAgent, setAgent, addProduct } = agentStore();

  return {
    agent,
    isLoading,
    isError,
    error,
    getAgentById,
    resetAgent,
    addProduct,
    setAgent,
  };
};

export default useAgent;
