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

import { StageDetail } from ".";

import useStage from "../../../../hooks/useStage";
import ModalWarning from "../../../ui/ModalWarning";

const StageList = ({ setShowModal, showModal }: any) => {
  const {
    stageList,
    createStage,
    updateStage,
    deleteStage,
    setStage,
    resetStage,
    stage,
  } = useStage();

  const [search, setSearch] = useState("");
  const [showWarningDelete, setShowWarningDelete] = useState(false);

  const editStage = (stage: any) => {
    setStage(stage);
    setShowModal(true);
  };

  const setClosed = () => {
    resetStage();
    setShowModal(false);
  };

  const saveStage = (id: string, name: string) => {
    if (id === "") {
      createStage(name);
    } else {
      updateStage(id, name);
    }
    setShowModal(false);
  };

  const setClosedWarningDelete = () => {
    setShowWarningDelete(false);
  };

  const handleClickDelete = (stage: any) => {
    setStage(stage);
    setShowWarningDelete(true);
  };

  const handleClickDeleteOK = (stage_id: string) => {
    deleteStage(stage_id);
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
            {stageList.map((stage: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="350px">
                  {stage.name}
                  {/* <TableIcons>
                    <Icon iconName="edit" onClick={() => editStage(stage)} />
                    <Icon
                      iconName="delete"
                      onClick={() => handleClickDelete(stage)}
                    />
                  </TableIcons> */}
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow gap="10px" align="flex-end">
          <ContentCellSummary>{`${stageList.length} etapas`}</ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <Modal showModal={showModal}>
        <Window title="Etapa" setClosed={setClosed}>
          <StageDetail saveStage={saveStage} />
        </Window>
      </Modal>
      <ModalWarning
        showModal={showWarningDelete}
        title="Eliminación de etapa"
        message={`¿Está seguro de eliminar la etapa ${stage.name}?`}
        setClosed={setClosedWarningDelete}
        iconName="warning"
        buttons={[
          { text: "No", function: setClosedWarningDelete },
          { text: "Si", function: () => handleClickDeleteOK(stage.id) },
        ]}
      />
    </Fragment>
  );
};

export default StageList;
