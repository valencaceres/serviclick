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

import { ValueTypeDetail } from ".";

import { useValueType } from "../../../../hooks";
import ModalWarning from "../../../ui/ModalWarning";
import { LoadingMessage, SuccessMessage } from "../../../ui/LoadingMessage";

const ValueTypeList = ({ setShowModal, showModal }: any) => {
  const {
    valueTypeList,
    createValueType,
    updateValueTypeById,
    setValueType,
    resetValueTypeAll,
    valueType,
    valueTypeLoading,
  } = useValueType();

  const [search, setSearch] = useState("");
  const [showWarningDelete, setShowWarningDelete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const editValueType = (valueType: any) => {
    setValueType(valueType);
    setShowModal(true);
  };

  const setClosed = () => {
    resetValueTypeAll();
    setShowModal(false);
  };

  const saveValueType = (id: string, name: string, isBroker: boolean) => {
    if (valueType.id === "") {
      createValueType(valueType);
    } else {
      updateValueTypeById(valueType);
    }
    setShowModal(false);
  };

  const setClosedWarningDelete = () => {
    setShowWarningDelete(false);
  };

  const handleClickDelete = (valueType: any) => {
    setValueType(valueType);
    setShowWarningDelete(true);
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
            {valueTypeList.map((valueType: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="350px">
                  {valueType.description}
                  {/* <TableIcons>
                    <Icon
                      iconName="edit"
                      onClick={() => editValueType(valueType)}
                    />
                    <Icon
                      iconName="delete"
                      onClick={() => handleClickDelete(valueType)}
                    />
                  </TableIcons> */}
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow gap="10px" align="flex-end">
          <ContentCellSummary>{`${valueTypeList.length} tipos de valor`}</ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <Modal showModal={showModal}>
        <Window title="Nuevo Canal" setClosed={setClosed}>
          <ValueTypeDetail saveValueType={saveValueType} />
        </Window>
      </Modal>
      {valueTypeLoading ? (
        <LoadingMessage showModal={valueTypeLoading} />
      ) : (
        isSaving && (
          <SuccessMessage showModal={!valueTypeLoading} callback={() => {}}>
            Tipo de valor registrado correctamente
          </SuccessMessage>
        )
      )}
    </Fragment>
  );
};

export default ValueTypeList;
