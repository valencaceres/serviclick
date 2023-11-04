import { Fragment, useEffect } from "react";
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
import { useQueryLead } from "~/hooks/query";
import { useCase } from "~/store/hooks/useCase";
import Button from "../../ui/Button";
import Link from "next/link";
import { format } from "date-fns";

const CaseStageList = ({ showModal, setShowModal, caseValue }: any) => {
  const router = useRouter();

  const {
    data: contract,
    isError,
    isLoading,
    isFetching,
  } = useQueryLead().useGetContract(caseValue?.lead_id ?? "");

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
            {caseValue?.history?.map((stage: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="95px" align="center">
                  {stage?.date}
                </TableCell>
                <TableCell width="57px">{stage?.time}</TableCell>
                <TableCell width="177px" align="center">
                  {stage.user?.first_name + " " + stage.user?.last_name}
                </TableCell>
                <TableCell width="208px" align="center">
                  {stage.name}
                </TableCell>
                <TableCell width="41px" align="center">
                  <TableIcons>
                    <Icon
                      iconName="search"
                      button={true}
                      onClick={() => {
                        router.push(
                          `/assistance/case/${stage.code.toLowerCase()}/${
                            caseValue?.case_id
                          }`
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
            color={
              caseValue && caseValue.history && caseValue.history.length > 0
                ? "blue"
                : "#959595"
            }
          >
            {caseValue?.history?.length === 0
              ? "No hay acciones"
              : caseValue?.history?.length === 1
              ? "1 acción"
              : `${caseValue?.history?.length} acciones`}
          </ContentCellSummary>
          <div className="flex gap-2">
            {contract && !isError && !isLoading && !isFetching && (
              <Link
                href={contract.link}
                target="_blank"
                className="flex items-center rounded-full bg-teal-blue px-4 py-2 text-white hover:bg-teal-blue-400"
              >
                <Icon iconName="history_edu" className="mr-2" />
                Contrato
              </Link>
            )}
            <Button
              text="Chat"
              iconName="chat"
              onClick={() => setShowModal(true)}
            />
          </div>
        </ContentRow>
      </ContentCell>
      <LoadingMessage />
    </Fragment>
  );
};

export default CaseStageList;
