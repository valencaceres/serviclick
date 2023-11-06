import { useState, Fragment, useEffect } from "react";

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
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    specialist,
    specialistList,
    specialistIsLoading,
    getAllSpecialists,
    families,
    getSpecialistsBySpecialtyId,
    getSpecialistsByName,
  } = useSpecialist();

  const initialSearchForm = {
    family_id: "",
    name: "",
  };

  const [search, setSearch] = useState(initialSearchForm);

  const handleChangeFamily = (e: any) => {
    setSearch({
      ...search,
      family_id: e.target.value,
    });
  };

  const handleChangeSpecialist = (e: any) => {
    setSearch({
      ...search,
      name: e.target.value,
    });
  };

  const handleDeleteSpecialist = async (id: string) => {
    setIsDeleting(true);
    await deleteSpecialist(id);
    setIsDeleting(false);
  };

  useEffect(() => {
    if (isDeleting === false) {
      getAllSpecialists();
    }
  }, [isDeleting]);

  const handleClickSearch = () => {
    if (search.family_id !== "") {
      getSpecialistsBySpecialtyId(search.family_id);
    } else if (search.name !== "") {
      getSpecialistsByName(search.name);
    } else {
      getAllSpecialists();
    }
  };

  return (
    <Fragment>
      <ContentCell gap="5px" className="fade-in-fwd">
        <ContentRow gap="5px" align="center">
          <ComboBox
            label="Especialidad"
            width="250px"
            value={search.family_id}
            onChange={handleChangeFamily}
            placeHolder=":: Seleccione especialidad ::"
            data={families}
            dataValue="id"
            dataText="name"
          />
          <InputText
            label="Buscar por nombre"
            width="310px"
            value={search.name}
            onChange={handleChangeSpecialist}
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
                      onClick={() => handleDeleteSpecialist(specialist.id)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="flex-start">
          <ContentCellSummary
            color={specialistList.length > 0 ? "blue" : "#959595"}
          >
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
