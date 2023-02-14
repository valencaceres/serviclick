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

import { useSpecialist } from "../../../../store/hooks";
import { LoadingMessage, SuccessMessage } from "../../../ui/LoadingMessage";

const SpecialistList = ({
  editSpecialist,
  deleteSpecialist,
  isSaving,
}: any) => {
  const {
    specialist,
    specialistList,
    specialistIsLoading,
    getAssistancesByFamilyId,
    families,
    assistances,
  } = useSpecialist();

  const initialSearchForm = {
    family_id: "",
    assistance_id: "",
  };

  const [search, setSearch] = useState(initialSearchForm);

  const handleChangeFamily = (e: any) => {
    setSearch({
      ...search,
      family_id: e.target.value,
    });
    getAssistancesByFamilyId(e.target.value);
  };

  const handleChangeAssistance = (e: any) => {
    setSearch({
      ...search,
      assistance_id: e.target.value,
    });
  };

  const handleClickSearch = () => {};

  return (
    <Fragment>
      <ContentCell gap="5px" className="fade-in-fwd">
        <ContentRow gap="5px" align="center">
          <ComboBox
            label="Familia"
            width="250px"
            value={search.family_id}
            onChange={handleChangeFamily}
            placeHolder=":: Seleccione familia ::"
            data={families}
            dataValue="id"
            dataText="name"
          />
          <ComboBox
            label="Asistencia"
            width="300px"
            value={search.assistance_id}
            onChange={handleChangeAssistance}
            placeHolder=":: Seleccione asistencia ::"
            data={assistances}
            dataValue="id"
            dataText="name"
          />
          <ButtonIcon
            iconName="search"
            color="gray"
            onClick={handleClickSearch}
          />
        </ContentRow>
        <Table>
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="455px">Nombre</TableCell>
            <TableCell width="68px">&nbsp;</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {specialistList.map((specialist: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="455px">{specialist.name}</TableCell>
                <TableCell width="68px" align="center">
                  <TableIcons>
                    <Icon
                      iconName="edit"
                      onClick={() => editSpecialist(specialist.id)}
                    />
                    <Icon
                      iconName="delete"
                      onClick={() => deleteSpecialist(specialist.id)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="flex-start">
          <ContentCellSummary
            color={specialistList.length > 0 ? "blue" : "#959595"}>
            {specialistList.length === 0
              ? "No hay especialistas"
              : specialistList.length === 1
              ? "1 especialista"
              : `${specialistList.length} especialistas`}
          </ContentCellSummary>
        </ContentRow>
      </ContentCell>
      {specialistIsLoading ? (
        <LoadingMessage showModal={specialistIsLoading} />
      ) : (
        isSaving && (
          <SuccessMessage showModal={!specialistIsLoading} callback={() => {}}>
            Servicio registrado correctamente
          </SuccessMessage>
        )
      )}
    </Fragment>
  );
};

export default SpecialistList;
