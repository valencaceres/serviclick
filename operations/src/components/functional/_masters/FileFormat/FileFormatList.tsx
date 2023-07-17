import { useState, Fragment } from "react";

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
  TableIcons,
  TableCellEnd,
} from "../../../ui/Table";

import { useFileFormat } from "../../../../hooks";

const FileFormatList = () => {
  const { fileFormatList } = useFileFormat();

  return (
    <Fragment>
      <ContentCell gap="10px">
        <Table width="700px">
          <TableHeader>
            <TableCell width="140px" align="center">
              Rut
            </TableCell>
            <TableCell width="545px">Nombre</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {fileFormatList.map((item: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="140px" align="center">
                  {item.rut}
                </TableCell>
                <TableCell width="545px">{item.companyname}</TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
      </ContentCell>
    </Fragment>
  );
};

export default FileFormatList;
