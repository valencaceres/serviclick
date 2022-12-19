import * as ChannelSlice from "../redux/slices/channelSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useChannel = () => {
  const dispatch = useAppDispatch();

  const { channel, list } = useAppSelector((state) => state.channelSlice);

  const create = (name: string, isBroker: boolean) => {
    dispatch(ChannelSlice.createChannel(name, isBroker));
  };

  const update = (id: string, name: string, isBroker: boolean) => {
    dispatch(ChannelSlice.updateChannel(id, name, isBroker));
  };

  const deleteById = (value: string) => {
    dispatch(ChannelSlice.deleteChannel(value));
  };

  const listAll = () => {
    dispatch(ChannelSlice.listChannels());
  };

  const setList = (value: ChannelSlice.ChannelT[]) => {
    dispatch(ChannelSlice.setChannelList(value));
  };

  const set = (value: ChannelSlice.ChannelT) => {
    dispatch(ChannelSlice.setChannel(value));
  };

  const reset = () => {
    dispatch(ChannelSlice.resetChannel());
  };

  return {
    create,
    update,
    deleteById,
    listAll,
    setList,
    set,
    reset,
    channel,
    list,
  };
};

export default useChannel;
