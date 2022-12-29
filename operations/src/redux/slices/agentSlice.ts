import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export type AgentT = {
  id: string;
  channel_id: string;
  name: string;
  isActive: boolean;
};

type StateT = {
  list: AgentT[];
  agent: AgentT;
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  agent: { id: "", channel_id: "", name: "", isActive: false },
  loading: false,
  error: false,
};

export const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setAgentList: (state: any, action: PayloadAction<any>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setAgent: (state: any, action: PayloadAction<any>) => {
      state.agent = action.payload;
      state.loading = false;
      state.error = false;
    },
    resetAgent: (state: any) => {
      state.agent = initialState.agent;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { setLoading, setError, setAgentList, setAgent, resetAgent } =
  agentSlice.actions;

export default agentSlice.reducer;

export const createAgent =
  (channel_id: string, name: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.post(`/agent/create`, {
        channel_id,
        name,
      });
      dispatch(listAgents(channel_id));
      dispatch(setAgent(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const updateAgent =
  (id: string, channel_id: string, name: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.put(`/agent/update/${id}`, {
        channel_id,
        name,
      });
      dispatch(listAgents(channel_id));
      dispatch(setAgent(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const deleteAgent =
  (id: string, channel_id: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.delete(`/agent/delete/${id}`);
      dispatch(listAgents(channel_id));
      dispatch(resetAgent());
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const listAgents = (channel_id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/agent/list/${channel_id}`);
    dispatch(setAgentList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};
