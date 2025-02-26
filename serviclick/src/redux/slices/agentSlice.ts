import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { post, get, erase } from "../../utils/api";
import { config } from "../../utils/config";


interface Product {
  product_id: string;
  name: string;
  beneficiaries: number;
  promotional: string;
  beneficiary_price: number | null;
  productPlan_id:{
    customer_plan_id: string;
    yearly_plan_id: string;
  };  
  price: {
      base: number | null;
      customer: number;
      yearlyprice: number | null;
  };
  discount: {
      type: string;
      percent: number;
      cicles: number;
  };
  pdfbase64: string | null;
}

interface AgentProductResponse {
  agent: {
      id: string;
      channel_id: string;
      name: string;
      fantasyname: string;
  };
  products: Product[];
}

export type AgentT = {
  id: string;
  channel_id: string;
  name: string;
  isActive: boolean;
};

type StateT = {
  list: AgentT[];
  agent: AgentProductResponse;
};

const initialState: StateT = {
  list: [],
  agent: { agent:{id: "", channel_id: "", name: "", fantasyname: "",}, products: [] },
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
    reset: (state: any) => {
      state = initialState;
    }


  },
});

export const { setAgentList, setAgent, resetAgent, reset } = agentSlice.actions;

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
        `${config.server}/api/agent/update01//${id}`,
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

export const getById = (id: string) => async (dispatch: any) => {
  const { success, data, error } = await get(`agent/getDataById/${id}`);
  if (!success) {
    return false;
  }

  dispatch(setAgent(data));
  return true;
}
