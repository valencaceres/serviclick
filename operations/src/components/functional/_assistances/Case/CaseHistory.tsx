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
import { useQueryCase } from "~/hooks/query";
import { useUser } from "@clerk/nextjs";
import Button from "~/components/ui/Button";
const CaseHistory = ({ showModal, setShowModal }: any) => {
  const router = useRouter();

  const { caseValue } = useCase();
  const userIds = caseValue.history?.map((m: any) => m.user);
  const { data: operators } = useQueryCase().useGetUserByClerkId(userIds);

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
            {caseValue?.history.map((stage, idx: number) => {
              const user = operators?.data.find(
                (user: any) => user.id === stage.user
              );
              return (
                <TableRow key={idx}>
                  <TableCell width="95px" align="center">
                    {stage.date}
                  </TableCell>
                  <TableCell width="57px">{stage.time}</TableCell>
                  <TableCell width="177px" align="center">
                    {user
                      ? `${user.first_name} ${user.last_name}`
                      : "Usuario no encontrado"}
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
              );
            })}
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
          {caseValue.case_id !== null && caseValue.case_id !== "" && (
            <Button
              text="Chat"
              iconName="chat"
              onClick={() => setShowModal(true)}
            />
          )}
        </ContentRow>
      </ContentCell>
      <LoadingMessage />
    </Fragment>
  );
};
export default CaseHistory;
