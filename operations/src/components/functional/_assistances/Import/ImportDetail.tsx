import { useRouter } from "next/router";
import { Fragment, useState } from "react";

import {
  ContentCell,
  ContentCellSummary,
  ContentRow,
} from "../../../layout/Content";

import { LoadingMessage } from "../../../ui/LoadingMessage";

import { formatRut } from "../../../../utils/format";

import { useQueryImport } from "../../../../hooks/query";

import {
  Table,
  TableCell,
  TableCellEnd,
  TableDetail,
  TableHeader,
  TableRow,
} from "../../../ui/Table";

const ImportDetail = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading } = useQueryImport().useGetById_BCI(id as string);

  const handleFormatRut = (rut: string, dv: string) => {
    return formatRut(rut + dv);
  };
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
            {data?.map((customer: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell width="102px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="112px">
                  {handleFormatRut(customer.rut, customer.dv)}
                </TableCell>
                <TableCell width="238px" align="start">
                  {customer.asegurado}
                </TableCell>
                <TableCell width="94px" align="center">
                  {customer.tipo_dcto}
                </TableCell>
                <TableCell width="94px" align="center">
                  {customer.n_documento}
                </TableCell>
                <TableCell width="272px" align="start">
                  {customer.direccion}
                </TableCell>
                <TableCell width="238px" align="center">
                  {customer.comuna}
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="flex-start">
          <ContentCellSummary color={data?.length > 0 ? "blue" : "#959595"}>
            {data?.length === 0
              ? "No hay asegurados"
              : data?.length === 1
              ? "1 asegurado"
              : isLoading === true
              ? "Cargando..."
              : `${data?.length} asegurados`}
          </ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <LoadingMessage showModal={isLoading} />
    </Fragment>
  );
};

export default ImportDetail;
