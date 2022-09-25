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

const FamilyList = () => {
  const { list, create, update, deleteById, getById, reset } = useFamily();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const addFamily = () => {
    reset();
    setShowModal(true);
  };

  const editFamily = (family: any) => {
    getById(family.id);
    setShowModal(true);
  };

  const deleteFamily = (id: string) => {
    deleteById(id);
  };

  const setClosed = () => {
    reset();
    setShowModal(false);
  };

  const saveFamily = (id: string, name: string, values: any) => {
    if (id === "") {
      console.log(name, values);
      create(name, values);
    } else {
      console.log(id, name, values);
      update(id, name, values);
    }
    setShowModal(false);
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
              <TableRow key={idx} className={"deleted"}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="350px">
                  {family.name}
                  <TableIcons>
                    <Icon iconName="edit" onClick={() => editFamily(family)} />
                    <Icon
                      iconName="delete"
                      onClick={() => deleteFamily(family.id)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow gap="10px" align="flex-end">
          <ContentCellSummary>{`${list.length} registros`}</ContentCellSummary>
          <ButtonIcon iconName="add" onClick={addFamily} />
        </ContentRow>
      </ContentCell>
      <Modal showModal={showModal}>
        <Window title="Nueva Familia" setClosed={setClosed}>
          <FamilyDetail saveFamily={saveFamily} />
        </Window>
      </Modal>
    </Fragment>
  );
};

export default FamilyList;
