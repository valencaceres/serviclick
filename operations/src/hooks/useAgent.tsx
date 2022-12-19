import * as AgentSlice from "../redux/slices/agentSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useAgent = () => {
  const dispatch = useAppDispatch();

  const { agent, list } = useAppSelector((state) => state.agentSlice);

  const create = (channel_id: string, name: string) => {
    dispatch(AgentSlice.createAgent(channel_id, name));
  };

  const update = (id: string, channel_id: string, name: string) => {
    dispatch(AgentSlice.updateAgent(id, channel_id, name));
  };

  const deleteById = (id: string, channel_id: string) => {
    dispatch(AgentSlice.deleteAgent(id, channel_id));
  };

  const listAll = (channel_id: string) => {
    dispatch(AgentSlice.listAgents(channel_id));
  };

  const setList = (value: AgentSlice.AgentT[]) => {
    dispatch(AgentSlice.setAgentList(value));
  };

  const set = (value: AgentSlice.AgentT) => {
    dispatch(AgentSlice.setAgent(value));
  };

  const reset = () => {
    dispatch(AgentSlice.resetAgent());
  };

  return {
    create,
    update,
    deleteById,
    listAll,
    setList,
    set,
    reset,
    agent,
    list,
  };
};

export default useAgent;
