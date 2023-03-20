import { useState, Fragment, useEffect } from "react";

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
import Icon from "../../../ui/Icon";

import { LoadingMessage } from "../../../ui/LoadingMessage";

const CaseStageList = ({ viewImport }: any) => {
  return (
    <Fragment>
      <ContentCell gap="5px">
        <Table height="600px">
          <TableHeader>
            <TableCell width="95px" align="center">
              Fecha
            </TableCell>
            <TableCell width="57px">Hora</TableCell>
            <TableCell width="177px">Operador</TableCell>
            <TableCell width="208px">Etapa/Acción</TableCell>
            <TableCell width="41px">&nbsp;</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {[]?.map((data: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="95px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="57px">{data.companyname}</TableCell>
                <TableCell width="177px" align="center">
                  {data.createddate}
                </TableCell>
                <TableCell width="208px" align="center">
                  {data.year}
                </TableCell>
                <TableCell width="41px" align="center">
                  <TableIcons>
                    <Icon
                      iconName="search"
                      button={true}
                      onClick={() => viewImport(data.id)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="flex-start">
          <ContentCellSummary color={[]?.length > 0 ? "blue" : "#959595"}>
            {[]?.length === 0
              ? "No hay acciones"
              : []?.length === 1
              ? "1 acción"
              : `${[]?.length} acciones`}
          </ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <LoadingMessage />
    </Fragment>
  );
};

export default CaseStageList;
