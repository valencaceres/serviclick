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

import { useValue, useAssistance } from "../../../../hooks";

const AssistanceValues = ({ setShowModal }: any) => {
  const { valueList } = useValue();
  const { assistance, setAssistance } = useAssistance();

  const handleClickAddValue = (item: any) => {
    setAssistance({ ...assistance, values: [...assistance.values, item] });
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
          {valueList
            .filter((item: any) => {
              return !assistance.values
                ?.map((itemAssistance) => itemAssistance.name)
                .includes(item.name);
            })
            .map((value: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="270px">{value.name}</TableCell>
                <TableCell width="50px" align="center">
                  <TableIcons>
                    <Icon
                      iconName="add_circle"
                      onClick={() => handleClickAddValue(value)}
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

export default AssistanceValues;
