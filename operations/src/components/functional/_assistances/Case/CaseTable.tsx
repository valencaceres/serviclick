import { useState, Fragment, useEffect } from "react";

import { unFormatRut, formatRut } from "~/utils";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import ButtonIcon from "../../../ui/ButtonIcon";
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
import { useCase } from "~/store/hooks";
import { useRouter } from "next/router";
import { ComboBox } from "~/components/ui";

const CaseTable = ({
  filters,
  setFilters,
  search,
  next,
  previous,
  isNextClick,
  isLoding,
}: any) => {
  const router = useRouter();

  const { getRetails, retailList, getStatus, statusList, caseList } = useCase();

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const unformattedRut = unFormatRut(value);
    setFilters({ ...filters, applicant_rut: unformattedRut });
  };

  const handleBlur = (e: any) => {
    const value = e.target.value;

    const formattedRut = formatRut(value);
    setFilters({ ...filters, applicant_rut: formattedRut });
  };

  useEffect(() => {
    getStatus();
    getRetails();
  }, [, getRetails, getStatus]);

  return (
    <Fragment>
      <ContentCell gap="5px">
        <ContentRow gap="5px" align="center">
          <ComboBox
            id="retail_id"
            label="Origen"
            value={filters?.retail_id || ""}
            placeHolder=":: Seleccione un origen ::"
            onChange={(e: any) =>
              setFilters({ ...filters, retail_id: e.target.value })
            }
            data={retailList}
            dataValue={"id"}
            dataText={"name"}
            width="250px"
          />
          <InputText
            label="Rut Titular"
            width="150px"
            value={filters?.applicant_rut || ""}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={(e: any) => {
              setFilters({
                ...filters,
                applicant_rut: e.target.value,
                applicant_name: "",
              });
            }}
          />
          <InputText
            label="Beneficiario Titular"
            width="390px"
            value={filters?.applicant_name || ""}
            onChange={(e: any) => {
              setFilters({
                ...filters,
                applicant_name: e.target.value,
                applicant_rut: "",
              });
            }}
          />
          <ComboBox
            id="stage_id"
            label="Estado del caso"
            value={filters?.stage_id || ""}
            placeHolder=":: Seleccione estado ::"
            onChange={(e: any) =>
              setFilters({ ...filters, stage_id: e.target.value })
            }
            data={statusList}
            dataValue={"id"}
            dataText={"name"}
            width="250px"
          />
          <ButtonIcon onClick={() => search()} iconName="search" color="gray" />
        </ContentRow>
        <Table width="1100px">
          <TableHeader>
            <TableCell width="100px">N° Caso</TableCell>
            <TableCell width="220px">Origen</TableCell>
            <TableCell width="300px">Titular</TableCell>
            <TableCell width="250px">Servicio</TableCell>
            <TableCell width="210px">Estado</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {caseList.data &&
              caseList.data.map((caseItem: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell align="center" width="100px">
                    {caseItem.number}
                  </TableCell>
                  <TableCell width="220px">{caseItem.customer_name}</TableCell>
                  <TableCell width="300px">{caseItem.applicant_name}</TableCell>
                  <TableCell width="250px">
                    {caseItem.assistance_name}
                  </TableCell>
                  <TableCell width="210px">
                    {caseItem.stage_name}
                    <TableIcons>
                      <Icon
                        iconName="edit"
                        onClick={() =>
                          router.push(
                            `/assistance/case/${caseItem.code}/${caseItem.id}`
                          )
                        }
                      />
                    </TableIcons>
                  </TableCell>
                </TableRow>
              ))}
          </TableDetail>
        </Table>
        <ContentRow gap="5px" align="space-between">
          <ContentCellSummary
            color={caseList.summary.cases > 0 ? "blue" : "#959595"}
          >
            {caseList.summary.cases === 0
              ? "No hay casos"
              : caseList.summary.cases === 1
              ? "1 caso"
              : `${caseList.summary.cases} casos`}
          </ContentCellSummary>
          <ContentRow gap="5px" align="flex-end">
            <ButtonIcon
              iconName="navigate_before"
              onClick={previous}
              color="gray"
              loading={isLoding && !isNextClick}
            />
            <ContentCellSummary>{`Página ${filters?.page || 1} de ${
              caseList.pagination?.total || 1
            }`}</ContentCellSummary>
            <ButtonIcon
              iconName="navigate_next"
              onClick={next}
              loading={isLoding && isNextClick}
              color="gray"
            />
          </ContentRow>
        </ContentRow>
      </ContentCell>
    </Fragment>
  );
};

export default CaseTable;
