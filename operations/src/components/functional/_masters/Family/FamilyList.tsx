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

import { FamilyDetail } from ".";

import useFamily from "../../../../hooks/useFamily";
import ModalWarning from "../../../ui/ModalWarning";

const FamilyList = ({ setShowModal, showModal }: any) => {
  const { list, create, update, deleteById, set, reset, family } = useFamily();

  const [search, setSearch] = useState("");
  const [showWarningDelete, setShowWarningDelete] = useState(false);

  const editFamily = (family: any) => {
    set(family);
    setShowModal(true);
  };

  const deleteFamily = (id: string) => {
    deleteById(id);
  };

  const setClosed = () => {
    reset();
    setShowModal(false);
  };

  const saveFamily = (id: string, name: string) => {
    if (id === "") {
      create(name);
    } else {
      update(id, name);
    }
    setShowModal(false);
  };

  const setClosedWarningDelete = () => {
    setShowWarningDelete(false);
  };

  const handleClickDelete = (family: any) => {
    set(family);
    setShowWarningDelete(true);
  };

  const handleClickDeleteOK = (family_id: string) => {
    deleteFamily(family_id);
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
            {list.map((family: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="350px">
                  {family.name}
                  {/* <TableIcons>
                    <Icon
                      iconName="edit"
                      onClick={() => editFamily(family)}
                    />
                    <Icon
                      iconName="delete"
                      onClick={() => handleClickDelete(family)}
                    />
                  </TableIcons> */}
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow gap="10px" align="flex-end">
          <ContentCellSummary>{`${list.length} familias`}</ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <Modal showModal={showModal}>
        <Window title="Familia" setClosed={setClosed}>
          <FamilyDetail saveFamily={saveFamily} />
        </Window>
      </Modal>
      <ModalWarning
        showModal={showWarningDelete}
        title="Eliminación de familia"
        message={`¿Está seguro de eliminar la familia ${family.name}?`}
        setClosed={setClosedWarningDelete}
        iconName="warning"
        buttons={[
          { text: "No", function: setClosedWarningDelete },
          { text: "Si", function: () => handleClickDeleteOK(family.id) },
        ]}
      />
    </Fragment>
  );
};

export default FamilyList;
