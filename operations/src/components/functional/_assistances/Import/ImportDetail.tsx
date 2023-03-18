import { Fragment, useState } from "react";

import {
  ContentCell,
  ContentCellSummary,
  ContentRow,
} from "../../../layout/Content";

import { LoadingMessage } from "../../../ui/LoadingMessage";

import {
  Table,
  TableCell,
  TableCellEnd,
  TableDetail,
  TableHeader,
  TableRow,
} from "../../../ui/Table";

const ImportDetail = () => {
  return (
    <Fragment>
      <ContentCell gap="5px">
        <Table>
          <TableHeader>
            <TableCell width="102px" align="center">
              Convenio
            </TableCell>
            <TableCell width="112px">Rut</TableCell>
            <TableCell width="238px">Asegurado</TableCell>
            <TableCell width="94px">Tipo doc.</TableCell>
            <TableCell width="94px">N°</TableCell>
            <TableCell width="272px">Dirección</TableCell>
            <TableCell width="238px">Comuna</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {[{}].map((customer: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="102px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="112px">rut</TableCell>
                <TableCell width="238px" align="start">
                  Asegurado
                </TableCell>
                <TableCell width="94px" align="center">
                  2023
                </TableCell>
                <TableCell width="94px" align="center">
                  5
                </TableCell>
                <TableCell width="272px" align="start">
                  25000
                </TableCell>
                <TableCell width="238px" align="center">
                  Comuna
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="flex-start">
          <ContentCellSummary color={[].length > 0 ? "blue" : "#959595"}>
            {[].length === 0
              ? "No hay asegurados"
              : [].length === 1
              ? "1 asegurado"
              : `${[].length} asegurados`}
          </ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <LoadingMessage />
    </Fragment>
  );
};

export default ImportDetail;
