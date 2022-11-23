import { useState, useEffect, Fragment } from "react";

import ValueDetail from "./ValueDetail";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";
import ButtonIcon from "../../../ui/ButtonIcon";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
  TableCellEnd,
} from "../../../ui/Table";
import Icon from "../../../ui/Icon";

import { useValueType, useValue, useFamily } from "../../../../hooks";
import { Modal, Window } from "../../../ui/Modal";
import { LoadingMessage, SuccessMessage } from "../../../ui/LoadingMessage";

const ValueList = ({ setShowModal, showModal }: any) => {
  const { listAll } = useFamily();
  const { getAllValueTypes } = useValueType();
  const {
    valueLoading,
    valueError,
    families,
    value,
    valueList,
    createValue,
    updateValueById,
    getValueById,
    getAllValues,
    getValuesByFamilyId,
    resetValue,
  } = useValue();

  const initialSearchForm = {
    family: { value: "", isValid: true },
    searchText: { value: "", isValid: true },
  };

  const [search, setSearch] = useState(initialSearchForm);
  const [isSaving, setIsSaving] = useState(false);

  const editValue = (value: any) => {
    listAll();
    getAllValueTypes();
    getValueById(value.id);
    setShowModal(true);
  };

  const setClosed = () => {
    resetValue();
    setShowModal(false);
  };

  const saveValue = () => {
    setIsSaving(true);
    if (value.id === "") {
      createValue(value.family.id, value.name, value.valuetype_code);
    } else {
      updateValueById(
        value.id,
        value.family.id,
        value.name,
        value.valuetype_code
      );
    }
    setShowModal(false);
  };

  const handleChangeFamily = (e: any) => {
    setSearch({
      ...search,
      family: { value: e.target.value, isValid: true },
    });
  };

  const handleChangeSearchText = (e: any) => {
    setSearch({
      ...search,
      searchText: { value: e.target.value, isValid: true },
    });
  };

  const handleClickSearch = () => {
    search.family.value !== ""
      ? getValuesByFamilyId(search.family.value)
      : getAllValues();
  };

  useEffect(() => {
    setIsSaving(false);
  }, []);

  useEffect(() => {
    if (isSaving === true && valueLoading === false) {
      getAllValues();
      setIsSaving(false);
    }
  }, [valueLoading, isSaving]);

  return (
    <Fragment>
      <ContentCell gap="5px">
        <ContentRow gap="5px" align="center">
          <ComboBox
            label="Familia"
            width="300px"
            value={search.family.value}
            onChange={handleChangeFamily}
            placeHolder=":: Seleccione familia ::"
            data={families}
            dataValue="id"
            dataText="name"
          />
          <InputText
            label="Texto a buscar"
            width="450px"
            value={search.searchText.value}
            onChange={handleChangeSearchText}
          />
          <ButtonIcon
            iconName="search"
            color="gray"
            onClick={handleClickSearch}
          />
        </ContentRow>
        <Table width="800px">
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="263px">Familia</TableCell>
            <TableCell width="380px">Nombre</TableCell>
            <TableCell width="68px"></TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {valueList.map((value: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="263px">{value.family.name}</TableCell>
                <TableCell width="380px">{value.name}</TableCell>
                <TableCell width="68px" align="center">
                  <TableIcons>
                    <Icon iconName="edit" onClick={() => editValue(value)} />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="flex-end">
          <ContentCellSummary>{`${valueList.length} valores`}</ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <Modal showModal={showModal && !valueLoading}>
        <Window title="Nuevo valor" setClosed={setClosed}>
          <ValueDetail saveValue={saveValue} />
        </Window>
      </Modal>
      {valueLoading ? (
        <LoadingMessage showModal={valueLoading} />
      ) : (
        isSaving && (
          <SuccessMessage showModal={!valueLoading} callback={() => {}}>
            Valor registrado correctamente
          </SuccessMessage>
        )
      )}
    </Fragment>
  );
};

export default ValueList;
