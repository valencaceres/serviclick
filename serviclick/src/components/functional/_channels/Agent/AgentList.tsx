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

import { AgentDetail } from ".";

import useAgent from "../../../../hooks/useAgent";
import ModalWarning from "../../../ui/ModalWarning";

const AgentList = ({
  channel_id,
  setShowModal,
  showModal,
  handleClickEdit,
}: any) => {
  const { list, create, update, deleteById, set, reset, agent } = useAgent();

  const [search, setSearch] = useState("");
  const [showWarningDelete, setShowWarningDelete] = useState(false);

  const editAgent = (agent: any) => {
    set(agent);
    setShowModal(true);
  };

  const setClosed = () => {
    reset();
    setShowModal(false);
  };

  const saveAgent = (id: string, name: string) => {
    if (id === "") {
      create(channel_id, name);
    } else {
      update(id, channel_id, name);
    }
    setShowModal(false);
  };

  const setClosedWarningDelete = () => {
    setShowWarningDelete(false);
  };

  const handleClickDelete = (agent: any) => {
    set(agent);
    setShowWarningDelete(true);
  };

  const handleClickDeleteOK = (id: string) => {
    deleteById(id, channel_id);
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
            {list.map((agent: any, idx: number) => (
              <TableRow key={idx} className={"deleted"}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="350px">
                  {agent.name}
                  <TableIcons>
                    <Icon
                      iconName="edit"
                      onClick={() => handleClickEdit(agent.id)}
                    />
                    <Icon
                      iconName="delete"
                      onClick={() => handleClickDelete(agent)}
                    />
                  </TableIcons>
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
          <AgentDetail />
        </Window>
      </Modal>
      <ModalWarning
        showModal={showWarningDelete}
        title="Eliminación de producto"
        message={`Está seguro de eliminar el canal ${agent.agent.name}`}
        setClosed={setClosedWarningDelete}
        iconName="warning"
        buttons={[
          { text: "No", function: setClosedWarningDelete },
          {
            text: "Si",
            function: () => handleClickDeleteOK(agent.agent.id),
          },
        ]}
      />
    </Fragment>
  );
};

export default AgentList;
