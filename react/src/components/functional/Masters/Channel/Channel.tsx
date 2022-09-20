import { Fragment, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import { Modal, Window } from "../../../ui/Modal";
import ChannelList from "./ChannelList";
import ChannelDetail from "./ChannelDetail";

import {
  createChannel,
  updateChannel,
  deleteChannel,
  listChannels,
  setChannel,
  resetChannel,
} from "../../../../redux/slices/channelSlice";

const Channel = () => {
  const dispatch = useAppDispatch();

  const { channel } = useAppSelector((state) => state.channelSlice);

  useEffect(() => {
    dispatch(listChannels());
  }, [dispatch]);

  const addModal = () => {
    dispatch(resetChannel());
    setShowModal(true);
  };

  const editModal = (channel: any) => {
    dispatch(setChannel(channel));
    setShowModal(true);
  };

  const deleteModal = (id: string) => {
    dispatch(deleteChannel(id));
  };

  const saveChannel = (id: string, name: string, isBroker: boolean) => {
    if (id === "") {
      dispatch(createChannel(name, isBroker));
    } else {
      dispatch(updateChannel(id, name, isBroker));
    }
    setShowModal(false);
  };

  const setClosed = () => {
    dispatch(resetChannel());
    setShowModal(false);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <ChannelList
        addChannel={addModal}
        editChannel={editModal}
        deleteChannel={deleteModal}
      />
      <Modal showModal={showModal}>
        <Window title="Nuevo Canal" setClosed={setClosed}>
          <ChannelDetail saveChannel={saveChannel} />
        </Window>
      </Modal>
    </Fragment>
  );
};

export default Channel;
