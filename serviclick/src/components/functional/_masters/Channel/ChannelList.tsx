import { useState, Fragment } from "react";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import ButtonIcon from "../../../ui/ButtonIcon";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
} from "../../../ui/Table";
import Icon from "../../../ui/Icon";
import { Modal, Window } from "../../../ui/Modal";

import { ChannelDetail } from ".";

import useChannel from "../../../../hooks/useChannel";
import ModalWarning from "../../../ui/ModalWarning";

const ChannelList = ({ setShowModal, showModal }: any) => {
  const { list, create, update, deleteById, set, reset, channel } =
    useChannel();

  const [search, setSearch] = useState("");
  const [showWarningDelete, setShowWarningDelete] = useState(false);

  const editChannel = (channel: any) => {
    set(channel);
    setShowModal(true);
  };

  const deleteChannel = (id: string) => {
    deleteById(id);
  };

  const setClosed = () => {
    reset();
    setShowModal(false);
  };

  const saveChannel = (id: string, name: string, isBroker: boolean) => {
    if (id === "") {
      create(name, isBroker);
    } else {
      update(id, name, isBroker);
    }
    setShowModal(false);
  };

  const setClosedWarningDelete = () => {
    setShowWarningDelete(false);
  };

  const handleClickDelete = (channel: any) => {
    set(channel);
    setShowWarningDelete(true);
  };

  const handleClickDeleteOK = (channel_id: string) => {
    deleteChannel(channel_id);
    setShowWarningDelete(false);
  };

  return (
    <Fragment>
      <ContentCell gap="10px">
        <ContentRow gap="10px" align="center">
          <InputText
            label="Texto a buscar"
            width="375px"
            value={search}
            onChange={setSearch}
          />
          <ButtonIcon iconName="search" color="gray" />
        </ContentRow>
        <Table width="428px">
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="350px">Nombre</TableCell>
          </TableHeader>
          <TableDetail>
            {list.map((channel: any, idx: number) => (
              <TableRow key={idx} className={"deleted"}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="350px">
                  {channel.name}
                  {/* <TableIcons>
                    <Icon
                      iconName="edit"
                      onClick={() => editChannel(channel)}
                    />
                    <Icon
                      iconName="delete"
                      onClick={() => handleClickDelete(channel)}
                    />
                  </TableIcons> */}
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow gap="10px" align="flex-end">
          <ContentCellSummary>{`${list.length} registros`}</ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <Modal showModal={showModal}>
        <Window title="Nuevo Canal" setClosed={setClosed}>
          <ChannelDetail saveChannel={saveChannel} />
        </Window>
      </Modal>
      <ModalWarning
        showModal={showWarningDelete}
        title="Eliminación de producto"
        message={`Está seguro de eliminar el canal ${channel.name}`}
        setClosed={setClosedWarningDelete}
        iconName="warning"
        buttons={[
          { text: "No", function: setClosedWarningDelete },
          { text: "Si", function: () => handleClickDeleteOK(channel.id) },
        ]}
      />
    </Fragment>
  );
};

export default ChannelList;
