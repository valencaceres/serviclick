import { Fragment, useState } from "react";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableCellEnd,
} from "../../../ui/Table";
import Icon from "../../../ui/Icon/Icon";
import ButtonIcon from "../../../ui/ButtonIcon";

import { useFamily } from "../../../../hooks";
import { usePartner } from "../../../../store/hooks";

const PartnerSpecialties = ({ setShowSpecialitiesModal }: any) => {
  const { partner, setPartner } = usePartner();
  const { listAll } = useFamily();

  const handleClickAddSpeciality = () => {
    listAll();
    setShowSpecialitiesModal(true);
  };

  const handleClickDelete = (id: string) => {
    setPartner({
      ...partner,
      specialties: [...partner.specialties.filter((item) => item.id !== id)],
    });
  };

  return (
    <Fragment>
      <ContentCell gap="5px">
        <Table height="390px">
          <TableHeader>
            <TableCell width="150px">Familia</TableCell>
            <TableCell width="200px">Especialidad</TableCell>
            <TableCell width="40px">&nbsp;</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {partner.specialties?.length > 0 ? (
              partner.specialties.map((item, idx: number) => (
                <TableRow key={idx}>
                  <TableCell width="150px">{item.family_name}</TableCell>
                  <TableCell width="200px">{item.name}</TableCell>
                  <TableCell width="40px" align="center">
                    <Icon
                      iconName="delete"
                      button={true}
                      onClick={() => handleClickDelete(item.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell width="100%" align="center">
                  No hay especialidades
                </TableCell>
              </TableRow>
            )}
          </TableDetail>
        </Table>
        <ContentRow align="space-between">
          <ContentCellSummary
            color={partner.specialties.length > 0 ? "blue" : "#959595"}
          >
            {partner.specialties.length > 0
              ? `${partner.specialties.length} ${
                  partner.specialties.length === 1
                    ? "especialidad"
                    : "especialidades"
                }`
              : `Sin especialidades`}
          </ContentCellSummary>
          <ButtonIcon
            iconName="add"
            color="gray"
            onClick={handleClickAddSpeciality}
          />
        </ContentRow>
      </ContentCell>
    </Fragment>
  );
};

export default PartnerSpecialties;
