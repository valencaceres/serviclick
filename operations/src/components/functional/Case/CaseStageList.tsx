import { useState, Fragment, useEffect } from "react";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../layout/Content";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
  TableCellEnd,
} from "../../ui/Table";
import Icon from "../../ui/Icon";

import { LoadingMessage } from "../../ui/LoadingMessage";
import useQueryCase from "../../../hooks/query/useQueryCase";
import { useRouter } from "next/router";

const CaseStageList = ({ viewImport }: any) => {
  const router = useRouter();
  const { case_id } = router.query;

  const { data } = useQueryCase().useCaseById((case_id as string) || "");

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
            {data?.map((data: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="95px" align="center">
                  {new Date(data.createddate).toISOString().substring(0, 10)}
                </TableCell>
                <TableCell width="57px">
                  {new Date(data.createddate).toISOString().substring(11, 16)}
                </TableCell>
                <TableCell width="177px" align="center">
                  {data.operator_name + " " + data.operator_lastname}
                </TableCell>
                <TableCell width="208px" align="center">
                  {data.stage}
                </TableCell>
                <TableCell width="41px" align="center">
                  <TableIcons>
                    <Icon
                      iconName="search"
                      button={true}
                      onClick={() => {
                        router.push(
                          `/assistances/case/${
                            data.case_id
                          }/${data.stage.toLowerCase()}`
                        );
                      }}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="flex-start">
          <ContentCellSummary color={[]?.length > 0 ? "blue" : "#959595"}>
            {data?.length === 0
              ? "No hay acciones"
              : data?.length === 1
              ? "1 acción"
              : `${data?.length} acciones`}
          </ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <LoadingMessage />
    </Fragment>
  );
};

export default CaseStageList;
