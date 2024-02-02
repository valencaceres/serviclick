import { useState, Fragment, useEffect } from "react";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

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
import { ComboBox } from "~/components/ui";
import ComboboxDates from "~/components/ui/ComboBox/ComboboxDatesindex";
import { monthTranslations } from "~/data/masters";
interface CaseDate {
  month: string;
  year: string;
}

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

  const {
    getRetails,
    retailsList: retailList,
    list: caseList,
    caseDate,
    caseEventDate,
    getCaseDates,
    isLoading,
  } = useExportCase();
  const [retailListWithAll, setRetailListWithAll] = useState<
    { id: null; name: string }[]
  >([]);
  const [caseDateWithAll, setCaseDateWithAll] = useState<CaseDate[]>([]);
  const [caseEventDateWithAll, setCaseEventDateWithAll] = useState<CaseDate[]>(
    []
  );
  const [isLoadingComponent, setIsLoadingComponent] = useState(true);

  useEffect(() => {
    getRetails();
    getCaseDates();
  }, []);

  useEffect(() => {
    if (retailList) {
      const retailListWithAll = [{ id: null, name: "Todos" }, ...retailList];
      setRetailListWithAll(retailListWithAll);
    }
  }, [retailList]);
  useEffect(() => {
    if (caseDate) {
      const modifiedCaseDate = [
        { month: "Hoy", year: "" },
        { month: "Esta semana", year: "" },
        ...caseDate,

        { month: "Todos", year: "" },
      ];
      setCaseDateWithAll(modifiedCaseDate);
    }
  }, [caseDate]);

  useEffect(() => {
    if (caseEventDate) {
      const modifiedCaseEventDate = [
        ...caseEventDate,

        { month: "Todos", year: "" },
      ];
      setCaseEventDateWithAll(modifiedCaseEventDate);
    }
  }, [caseEventDate]);
  const caseDateWithAllTranslated = caseDateWithAll.map((date) => {
    const monthName = monthTranslations[date.month.trim()] || date.month.trim();
    return { ...date, month: monthName };
  });
  const caseEventDateWithAllTranslated = caseEventDateWithAll.map((date) => {
    const monthName = monthTranslations[date.month.trim()] || date.month.trim();
    return { ...date, month: monthName };
  });

  let caseListData = caseList || {
    data: [],
    summary: { cases: 0 },
    pagination: { total: 0, page: 1 },
  };

  useEffect(() => {
    if (
      filters.retail_id === "" ||
      (filters.case_date === "" && filters.event_date === "")
    ) {
      caseListData.data = [];
      caseListData.summary.cases = 0;
      caseListData.pagination.total = 0;
      caseListData.pagination.page = 1;
      setIsLoadingComponent(false);
    } else {
      caseListData.data = caseList.data;
    }
  }, [filters, caseList]);

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
            data={retailListWithAll}
            dataValue={"id"}
            dataText={"name"}
            width="350px"
          />
          <ComboboxDates
            id="case_date"
            label="Fecha del caso"
            value={filters?.case_date || ""}
            placeHolder=":: Seleccione fecha ::"
            onChange={(e: any) =>
              setFilters({
                ...filters,
                case_date: e.target.value,
                event_date: "",
              })
            }
            data={caseDateWithAllTranslated}
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
              setFilters({
                ...filters,
                event_date: e.target.value,
                case_date: "",
              })
            }
            data={caseEventDateWithAllTranslated}
            dataValue={"month"}
            dataText={"month"}
            width="350px"
          />
          <ButtonIcon
            disabled={
              filters.retail_id === "" ||
              (filters.case_date === "" && filters.event_date === "")
            }
            onClick={() => search()}
            iconName="search"
            color="gray"
          />
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
          {isLoadingComponent === false && (
            <TableDetail>
              {caseListData.data &&
                caseListData.data.map((caseItem: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell align="center" width="100px">
                      {caseItem.number}
                    </TableCell>
                    <TableCell width="220px">
                      {caseItem.customer_name}
                    </TableCell>
                    <TableCell width="300px">
                      {caseItem.applicant_name}
                    </TableCell>
                    <TableCell width="250px">
                      {caseItem.assistance_name}
                    </TableCell>
                    <TableCell width="210px">{caseItem.stage_name}</TableCell>
                  </TableRow>
                ))}
            </TableDetail>
          )}
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

export default CaseTableReports;
