import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "~/components/layout/Content";

import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
  TableCellEnd,
} from "~/components/ui/Table";
import Icon from "~/components/ui/Icon";
import { LoadingMessage } from "~/components/ui/LoadingMessage";
import { useCase } from "~/store/hooks";

const CaseHistory = () => {
  const router = useRouter();

  const { caseValue } = useCase();

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
            {caseValue?.history.map((stage, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="95px" align="center">
                  {stage.date}
                </TableCell>
                <TableCell width="57px">{stage.time}</TableCell>
                <TableCell width="177px" align="center">
                  {stage.user}
                </TableCell>
                <TableCell width="208px" align="left">
                  {stage.name}
                </TableCell>
                <TableCell width="41px" align="left">
                  <TableIcons>
                    <Icon
                      iconName="search"
                      button={true}
                      onClick={() => {
                        router.push(
                          `/assistance/case/${stage.code}/${caseValue?.case_id}`
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
            color={caseValue?.history?.length > 0 ? "blue" : "#959595"}
          >
            {caseValue?.history?.length === 0 || !caseValue?.history
              ? "No hay acciones"
              : caseValue?.history?.length === 1
              ? "1 acción"
              : `${caseValue?.history?.length} acciones`}
          </ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <LoadingMessage />
    </Fragment>
  );
};

export default CaseHistory;
