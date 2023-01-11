import create from "zustand";

import { apiInstance } from "../utils/api";

import { IChannel } from "../interfaces/channel";

interface channelState {
  channelList: IChannel[];
  channel: IChannel;
  loading: boolean;
  error: boolean;
  reset: () => void;
  resetAll: () => void;
  setChannel: (channel: IChannel) => void;
  getAll: any;
}

const initialData = {
  channelList: [],
  channel: {
    id: "",
    name: "",
    code: "",
  },
};

export const channelStore = create<channelState>((set, get) => ({
  channelList: initialData.channelList,
  channel: initialData.channel,
  loading: false,
  error: false,

  reset: () => set((state) => ({ ...state, channel: initialData.channel })),

  resetAll: () => set({}, true),

  setChannel: (channel: IChannel) => {
    set((state) => ({ ...state, channel }));
  },

  setChannelList: (channels: IChannel[]) => {
    set((state) => ({ ...state, channelList: channels }));
  },

  getAll: async () => {
    const { data } = await apiInstance.get(`/channel/list`);
    set((state) => ({ ...state, channelList: data }));
  },
}));
