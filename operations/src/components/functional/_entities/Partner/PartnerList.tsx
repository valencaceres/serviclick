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

import { usePartner } from "../../../../store/hooks";
import { LoadingMessage, SuccessMessage } from "../../../ui/LoadingMessage";

const PartnerList = ({ editPartner, deletePartner, isSaving }: any) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    partner,
    partnerList,
    partnerIsLoading,
    families,
    getAllPartners,
    getPartnersBySpecialtyId,
    getPartnersByName,
  } = usePartner();

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

  const handleChangePartner = (e: any) => {
    setSearch({
      ...search,
      name: e.target.value,
    });
  };

  const handleClickSearch = () => {
    if (search.family_id !== "") {
      return getPartnersBySpecialtyId(search.family_id);
    }
    if (search.name !== "") {
      return getPartnersByName(search.name);
    }
    return getAllPartners();
  };

  const handleDeletePartner = async (id: string) => {
    setIsDeleting(true);
    await deletePartner(id);
    setIsDeleting(false);
  };

  useEffect(() => {
    if (isDeleting === false) {
      getAllPartners();
    }
  }, [isDeleting]);

  return (
    <Fragment>
      <ContentCell gap="5px" className="fade-in-fwd">
        <ContentRow gap="5px" align="center">
          <ComboBox
            label="Especialidad"
            width="270px"
            value={search.family_id}
            onChange={handleChangeFamily}
            placeHolder=":: Seleccione especialidad ::"
            data={families}
            dataValue="id"
            dataText="name"
          />
          <InputText
            label="Buscar por nombre"
            width="481px"
            value={search.name}
            onChange={handleChangePartner}
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
            <TableCell width="108px">Rut</TableCell>
            <TableCell width="512px">Nombre</TableCell>
            <TableCell width="90px">&nbsp;</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {partnerList.map((partner: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="108px">{partner.rut}</TableCell>
                <TableCell width="512px">{partner.name}</TableCell>
                <TableCell width="90px" align="center">
                  <TableIcons>
                    <Icon
                      iconName="edit"
                      onClick={() => editPartner(partner.id)}
                    />
                    <Icon
                      iconName="delete"
                      onClick={() => handleDeletePartner(partner.id)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="flex-start">
          <ContentCellSummary
            color={partnerList.length > 0 ? "blue" : "#959595"}
          >
            {partnerList.length === 0
              ? "No hay alianzas"
              : partnerList.length === 1
              ? "1 alianza"
              : `${partnerList.length} alianzas`}
          </ContentCellSummary>
        </ContentRow>
      </ContentCell>
      {partnerIsLoading ? (
        <LoadingMessage showModal={partnerIsLoading} />
      ) : (
        isSaving && (
          <SuccessMessage showModal={!partnerIsLoading} callback={() => {}}>
            Servicio registrado correctamente
          </SuccessMessage>
        )
      )}
    </Fragment>
  );
};

export default PartnerList;
