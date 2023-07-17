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

import { useDocument, useAssistance } from "../../../../hooks";

const AssistanceDocuments = ({ setShowModal }: any) => {
  const { documentList } = useDocument();
  const { assistance, setAssistance } = useAssistance();

  const handleClickAddDocument = (item: any) => {
    setAssistance({
      ...assistance,
      documents: [...(assistance.documents || []), item],
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
          {documentList
            .filter((item: any) => {
              return !assistance.documents
                ?.map((itemAssistance) => itemAssistance.name)
                .includes(item.name);
            })
            .map((document: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="270px">{document.name}</TableCell>
                <TableCell width="50px" align="center">
                  <TableIcons>
                    <Icon
                      iconName="add_circle"
                      onClick={() => handleClickAddDocument(document)}
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

export default AssistanceDocuments;
