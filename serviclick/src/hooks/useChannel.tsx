import {
  createChannel,
  updateChannel,
  deleteChannel,
  listChannels,
  setChannelList,
  setChannel,
  resetChannel,
  ChannelT,
} from "../redux/slices/channelSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useChannel = () => {
  const dispatch = useAppDispatch();

  const { channel, list } = useAppSelector((state) => state.channelSlice);

  const create = (value: ChannelT) => {
    const { name, isBroker } = value;
    dispatch(createChannel(name, isBroker));
  };

  const update = (value: ChannelT) => {
    const { id, name, isBroker } = value;
    dispatch(updateChannel(id, name, isBroker));
  };

  const deleteById = (value: string) => {
    dispatch(deleteChannel(value));
  };

  const listAll = () => {
    dispatch(listChannels());
  };

  const setList = (value: ChannelT[]) => {
    dispatch(setChannelList(value));
  };

  const set = (value: ChannelT) => {
    dispatch(setChannel(value));
  };

  const reset = () => {
    dispatch(resetChannel());
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
