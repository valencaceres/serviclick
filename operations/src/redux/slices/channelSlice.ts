import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

export type ChannelT = {
  id: string;
  name: string;
  isBroker: boolean;
  isActive: boolean;
};

type StateT = {
  list: ChannelT[];
  channel: ChannelT;
  loading: boolean;
  error: boolean;
};

const initialState: StateT = {
  list: [],
  channel: { id: "", name: "", isBroker: false, isActive: false },
  loading: false,
  error: false,
};

export const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setLoading: (state: StateT, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StateT, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setChannelList: (state: any, action: PayloadAction<any>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = false;
    },
    setChannel: (state: any, action: PayloadAction<any>) => {
      state.channel = action.payload;
      state.loading = false;
      state.error = false;
    },
    resetChannel: (state: any) => {
      state.channel = initialState.channel;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  setLoading,
  setError,
  setChannelList,
  setChannel,
  resetChannel,
} = channelSlice.actions;

export default channelSlice.reducer;

export const createChannel =
  (name: string, isBroker: boolean) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.post(`/channel/create`, {
        name,
        isBroker,
      });
      dispatch(listChannels());
      dispatch(setChannel(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const updateChannel =
  (id: string, name: string, isBroker: boolean) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiInstance.put(`/channel/update/${id}`, {
        name,
        isBroker,
      });
      dispatch(listChannels());
      dispatch(setChannel(data));
    } catch (e) {
      dispatch(setError(true));
    }
  };

export const deleteChannel = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.delete(`/channel/delete/${id}`);
    dispatch(listChannels());
    dispatch(resetChannel());
  } catch (e) {
    dispatch(setError(true));
  }
};

export const listChannels = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const { data } = await apiInstance.get(`/channel/list`);
    dispatch(setChannelList(data));
  } catch (e) {
    dispatch(setError(true));
  }
};
