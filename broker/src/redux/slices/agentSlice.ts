import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";

export type AgentT = {
  id: string;
  channel_id: string;
  name: string;
  isActive: boolean;
};

type StateT = {
  list: AgentT[];
  agent: AgentT;
};

const initialState: StateT = {
  list: [],
  agent: { id: "", channel_id: "", name: "", isActive: false },
};

export const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    setAgentList: (state: any, action: PayloadAction<any>) => {
      state.list = action.payload;
    },
    setAgent: (state: any, action: PayloadAction<any>) => {
      state.agent = action.payload;
    },
    resetAgent: (state: any) => {
      state.agent = initialState.agent;
    },
  },
});

export const { setAgentList, setAgent, resetAgent } = agentSlice.actions;

export default agentSlice.reducer;

export const createAgent =
  (channel_id: string, name: string) => (dispatch: any) => {
    axios
      .post(
        `${config.server}/api/agent/create`,
        { channel_id, name },
        {
          headers: {
            id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
          },
        }
      )
      .then((response) => {
        dispatch(listAgents(channel_id));
        dispatch(setAgent(response.data));
      })
      .catch((error) => console.log(error));
  };

export const updateAgent =
  (id: string, channel_id: string, name: string) => (dispatch: any) => {
    axios
      .put(
        `${config.server}/api/agent/update/${id}`,
        { channel_id, name },
        {
          headers: {
            id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
          },
        }
      )
      .then((response) => {
        dispatch(listAgents(channel_id));
        dispatch(setAgent(response.data));
      })
      .catch((error) => console.log(error));
  };

export const deleteAgent =
  (id: string, channel_id: string) => (dispatch: any) => {
    axios
      .delete(`${config.server}/api/agent/delete/${id}`, {
        headers: {
          id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
        },
      })
      .then(() => {
        dispatch(listAgents(channel_id));
        dispatch(resetAgent());
      })
      .catch((error) => console.log(error));
  };

export const listAgents = (channel_id: string) => (dispatch: any) => {
  axios
    .get(`${config.server}/api/agent/list/${channel_id}`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(setAgentList(response.data));
    })
    .catch((error) => console.log(error));
};
