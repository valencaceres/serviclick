import React from "react";

import { ContentCell } from "../../../layout/Content";

import Icon from "../../../ui/Icon";
import {
  Table,
  TableCell,
  TableCellEnd,
  TableDetail,
  TableHeader,
  TableIcons,
  TableRow,
} from "../../../ui/Table";

import { useSpecialty, useAssistance } from "../../../../hooks";

const AssistanceSpecialties = ({ setShowModal }: any) => {
  const { specialtyList } = useSpecialty();
  const { assistance, setAssistance } = useAssistance();

  const handleClickAddSpecialty = (item: any) => {
    setAssistance({
      ...assistance,
      specialties: [...(assistance.specialties || []), item],
    });
    setShowModal(false);
  };

  return (
    <ContentCell>
      <Table width="335px" height="189px">
        <TableHeader>
          <TableCell width="270px">Valor</TableCell>
          <TableCell width="50px">&nbsp;</TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {specialtyList
            .filter((item: any) => {
              return !assistance.specialties
                ?.map((itemAssistance) => itemAssistance.name)
                .includes(item.name);
            })
            .map((specialty: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="270px">{specialty.name}</TableCell>
                <TableCell width="50px" align="center">
                  <TableIcons>
                    <Icon
                      iconName="add_circle"
                      onClick={() => handleClickAddSpecialty(specialty)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
        </TableDetail>
      </Table>
    </ContentCell>
  );
};

export default AssistanceSpecialties;
