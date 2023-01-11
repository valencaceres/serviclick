import shallow from "zustand/shallow";
import { channelStore } from "../store/channelStore";

const useChannel = () => {
  const {
    channel,
    channelList,
    loading: channelLoading,
    error: channelError,
  } = channelStore(
    (state) => ({
      channel: state.channel,
      channelList: state.channelList,
      loading: state.loading,
      error: state.error,
    }),
    shallow
  );
  const {
    setChannel,
    getAll: getAllChannels,
    reset: resetChannel,
  } = channelStore();

  return {
    channel,
    channelList,
    channelLoading,
    channelError,
    setChannel,
    getAllChannels,
    resetChannel,
  };
};

export default useChannel;
