import { useState, Fragment, useEffect } from "react";
import * as FileSaver from 'file-saver';

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
import { useExportCase } from "~/store/hooks";
import { useRouter } from "next/router";
import { ComboBox} from "~/components/ui";
import  ComboboxDates from "~/components/ui/ComboBox/ComboboxDatesindex"
import Button from "~/components/ui/Button";
const CaseTableReports = ({
  filters,
  setFilters,
  search,
  next,
  previous,
  isNextClick,
  isLoding,
}: any) => {
  const router = useRouter();

  const { getRetails, retailsList: retailList, list: caseList ,caseDate, caseEventDate, getCaseDates, exportCases, isLoading} = useExportCase();

  const handleExport = async () => {
    exportCases(
      filters.retail_id,
      filters.case_date,
      filters.event_date,
      filters.records,
      1
    );
  };
  useEffect(() => {
    getRetails();
    getCaseDates();
  }, [getCaseDates, getRetails]);

  return (
    <Fragment>
      <ContentCell gap="5px">
        <ContentRow gap="5px" align="center">
          <ComboBox
            id="retail_id"
            label="Empresa"
            value={filters?.retail_id || ""}
            placeHolder=":: Seleccione empresa ::"
            onChange={(e: any) =>
              setFilters({ ...filters, retail_id: e.target.value })
            }
            data={retailList}
            dataValue={"id"}
            dataText={"name"}
            width="350px"
          />
                  <ComboboxDates
            id="case_date"
            label="Fecha del caso"
            value={filters?.case_date  || ""}
            placeHolder=":: Seleccione fecha ::"
            onChange={(e: any) =>
              setFilters({ ...filters, case_date: e.target.value, event_date: "" })
            }
            data={caseDate}
            dataValue={"month"}
            dataText={"month"}
            width="350px"
          />
              <ComboboxDates
            id="case_event_date"
            label="Fecha del evento del caso"
            value={filters?.event_date || ""}
            placeHolder=":: Seleccione fecha ::"
            onChange={(e: any) =>
              setFilters({ ...filters, event_date: e.target.value, case_date: "", })
            }
            data={caseEventDate}
            dataValue={"month"}
            dataText={"month"}
            width="350px"
          />
           
          
         
         
          <ButtonIcon onClick={() => search()} iconName="search" color="gray" />
        </ContentRow>
        <Table width="1100px">
          <TableHeader>
            <TableCell width="100px">N° Caso</TableCell>
            <TableCell width="220px">Cliente</TableCell>
            <TableCell width="300px">Asegurado / Beneficiario</TableCell>
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
          <Button loading={isLoading} onClick={handleExport} text="Exportar casos a Excel" />

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

export default CaseTableReports;
