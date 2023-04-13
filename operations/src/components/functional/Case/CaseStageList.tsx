import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";

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

import { useQueryCase } from "../../../hooks/query";
import Button from "../../ui/Button";

const CaseStageList = ({ showModal, setShowModal }: any) => {
  const router = useRouter();
  const { case_id } = router.query;

  const { data } = useQueryCase().useGetById((case_id as string) || "");

  return (
    <Fragment>
      <ContentCell gap="5px">
        <Table height="400px">
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
            {data?.stages?.map((stage: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="95px" align="center">
                  {new Date(stage.createddate).toISOString().substring(0, 10)}
                </TableCell>
                <TableCell width="57px">
                  {new Date(stage.createddate).toISOString().substring(11, 16)}
                </TableCell>
                <TableCell width="177px" align="center">
                  {stage.operator_name + " " + stage.operator_lastname}
                </TableCell>
                <TableCell width="208px" align="center">
                  {stage.stage}
                </TableCell>
                <TableCell width="41px" align="center">
                  <TableIcons>
                    <Icon
                      iconName="search"
                      button={true}
                      onClick={() => {
                        router.push(
                          `/case/${data?.case_id}/${stage.stage.toLowerCase()}`
                        );
                      }}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow className="justify-between">
          <ContentCellSummary
            color={data?.stages?.length > 0 ? "blue" : "#959595"}
          >
            {data?.stages?.length === 0
              ? "No hay acciones"
              : data?.stages?.length === 1
              ? "1 acción"
              : `${data?.stages?.length} acciones`}
          </ContentCellSummary>
          <Button
            text="Chat"
            iconName="chat"
            onClick={() => setShowModal(true)}
          />
        </ContentRow>
      </ContentCell>
      <LoadingMessage />
    </Fragment>
  );
};

export default CaseStageList;
