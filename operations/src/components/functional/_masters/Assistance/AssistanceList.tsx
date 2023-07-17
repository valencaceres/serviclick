import { useState, Fragment } from "react";

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

import { useAssistance } from "../../../../hooks";
import { LoadingMessage, SuccessMessage } from "../../../ui/LoadingMessage";

const AssistanceList = ({ editAssistance, isSaving }: any) => {
  const {
    getAllAssistances,
    getAssistancesByFamilyId,
    families,
    assistanceList,
    assistanceLoading,
  } = useAssistance();

  const initialSearchForm = {
    family: { value: "", isValid: true },
    searchText: { value: "", isValid: true },
  };

  const [search, setSearch] = useState(initialSearchForm);

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
      ? getAssistancesByFamilyId(search.family.value)
      : getAllAssistances();
  };

  return (
    <Fragment>
      <ContentCell gap="10px">
        <ContentRow gap="10px" align="center">
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
            width="640px"
            value={search.searchText.value}
            onChange={handleChangeSearchText}
          />
          <ButtonIcon
            iconName="search"
            color="gray"
            onClick={handleClickSearch}
          />
        </ContentRow>
        <Table width="1000px">
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="263px">Familia</TableCell>
            <TableCell width="580px">Nombre</TableCell>
            <TableCell width="68px"></TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {assistanceList.map((assistance: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="263px">{assistance.family.name}</TableCell>
                <TableCell width="580px">{assistance.name}</TableCell>
                <TableCell width="68px" align="center">
                  <TableIcons>
                    <Icon
                      iconName="edit"
                      onClick={() => editAssistance(assistance.id)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="flex-end">
          <ContentCellSummary>{`${assistanceList.length} servicios`}</ContentCellSummary>
        </ContentRow>
      </ContentCell>
      {assistanceLoading ? (
        <LoadingMessage showModal={assistanceLoading} />
      ) : (
        isSaving && (
          <SuccessMessage showModal={!assistanceLoading} callback={() => {}}>
            Servicio registrado correctamente
          </SuccessMessage>
        )
      )}
    </Fragment>
  );
};

export default AssistanceList;
