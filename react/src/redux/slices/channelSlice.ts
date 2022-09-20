import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { config } from "../../utils/config";

const initialState = {
  list: [],
  channel: { id: "", name: "", isBroker: "", isActive: false },
};

export const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannelList: (state: any, action: PayloadAction<any>) => {
      state.list = action.payload;
    },
    setChannel: (state: any, action: PayloadAction<any>) => {
      state.channel = action.payload;
    },
    resetChannel: (state: any) => {
      state.channel = initialState.channel;
    },
  },
});

export const { setChannelList, setChannel, resetChannel } =
  channelSlice.actions;

export default channelSlice.reducer;

export const listChannels = () => (dispatch: any) => {
  axios
    .get(`${config.server}/api/channel/list`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then((response) => {
      dispatch(setChannelList(response.data));
    })
    .catch((error) => console.log(error));
};

export const createChannel =
  (name: string, isBroker: boolean) => (dispatch: any) => {
    axios
      .post(
        `${config.server}/api/channel/create`,
        { name, isBroker },
        {
          headers: {
            id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
          },
        }
      )
      .then((response) => {
        dispatch(listChannels());
        dispatch(setChannel(response.data));
      })
      .catch((error) => console.log(error));
  };

export const updateChannel =
  (id: string, name: string, isBroker: boolean) => (dispatch: any) => {
    axios
      .put(
        `${config.server}/api/channel/update/${id}`,
        { name, isBroker },
        {
          headers: {
            id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
          },
        }
      )
      .then((response) => {
        dispatch(listChannels());
        dispatch(setChannel(response.data));
      })
      .catch((error) => console.log(error));
  };

export const deleteChannel = (id: string) => (dispatch: any) => {
  axios
    .delete(`${config.server}/api/channel/delete/${id}`, {
      headers: {
        id: "06eed133-9874-4b3b-af60-198ee3e92cdc",
      },
    })
    .then(() => {
      dispatch(listChannels());
      dispatch(resetChannel());
    })
    .catch((error) => console.log(error));
};
