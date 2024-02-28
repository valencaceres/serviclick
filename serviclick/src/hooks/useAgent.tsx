import {
  createAgent,
  updateAgent,
  deleteAgent,
  listAgents,
  setAgentList,
  setAgent,
  resetAgent,
  getById,
  AgentT,
} from "../redux/slices/agentSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useAgent = () => {
  const dispatch = useAppDispatch();

  const { agent, list } = useAppSelector((state) => state.agentSlice);

  const create = (channel_id: string, name: string) => {
    dispatch(createAgent(channel_id, name));
  };

  const update = (id: string, channel_id: string, name: string) => {
    dispatch(updateAgent(id, channel_id, name));
  };
  const getAgentById = (id: string) => {
    dispatch(getById(id));
  };

  const deleteById = (id: string, channel_id: string) => {
    dispatch(deleteAgent(id, channel_id));
  };

  const listAll = (channel_id: string) => {
    dispatch(listAgents(channel_id));
  };

  const setList = (value: AgentT[]) => {
    dispatch(setAgentList(value));
  };

  const set = (value: AgentT) => {
    dispatch(setAgent(value));
  };

  const reset = () => {
    dispatch(resetAgent());
  };

  return {
    create,
    update,
    deleteById,
    listAll,
    setList,
    set,
    getAgentById,
    reset,
    agent,
    list,
  };
};

export default useAgent;
