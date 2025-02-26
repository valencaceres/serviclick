import { useEffect, Fragment, useState } from "react";
import { useRouter } from "next/router";

import FloatMenu from "~/components/ui/FloatMenu";
import ButtonIcon from "~/components/ui/ButtonIcon";

import CaseTable from "~/components/functional/_assistances/Case/CaseTableReports";

import { useUI } from "~/hooks";
import { useExportCase, useCase } from "~/store/hooks";

interface IFilters {
  retail_id: string;
  case_date: string;
  event_date: string;
  records: number;
  page: number;
}

const initialFilters: IFilters = {
  retail_id: "",
  case_date: "",
  event_date: "",
  records: 20,
  page: 1,
};

const CasePage = () => {
  const router = useRouter();

  const {
    getAll,
    isLoading,
    getRetails,
    retailsList,
    list: caseList,
    exportCases
   
  } = useExportCase();
  const {  
    reset: resetCase,
    resetApplicant }= useCase()

  const { setTitleUI } = useUI();
  const [isNextClick, setIsNextClick] = useState(false);

  const [filters, setFilters] = useState<IFilters>(initialFilters);
  const [selectedRetailValue, setSelectedRetailValue] = useState("");
  const [selectedStageValue, setSelectedStageValue] = useState("");
  const [inputRut, setInputRut] = useState("");
  const [inputText, setInputText] = useState();
  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    handleClickSearch();
  };

  const handleClickSearch = () => {
    getAll(
      filters.retail_id,
      filters.case_date,
      filters.event_date,
      filters.records,
      1
    );
  };

  const handleExport = async () => {
    exportCases(
      filters.retail_id,
      filters.case_date,
      filters.event_date,
      filters.records,
      1
    );
  };

  const handleClickNextPage = () => {
    setIsNextClick(true);
    if ((filters?.page || 1) === caseList.pagination.total) return;
    setFilters({ ...filters, page: filters.page + 1 });
    getAll(
      filters.retail_id,
      filters.case_date,
      filters.event_date,
      filters.records,
      filters.page + 1
    );
  };

  const handleClickPrevPage = () => {
    setIsNextClick(false);
    if ((filters?.page || 1) === 1) return;
    setFilters({ ...filters, page: filters.page - 1 });
    getAll(
      filters.retail_id,
      filters.case_date,
      filters.event_date,
      filters.records,
      filters.page - 1
    );
  };

  const handleClickNew = () => {
    resetApplicant();
    resetCase();
    router.push("/assistance/case/applicant/new");
  };

  useEffect(() => {
    setTitleUI("Casos");
  }, [router]);

  useEffect(() => {
    setFilters(initialFilters);
    getAll(
      initialFilters.retail_id,
      filters.case_date,
      filters.event_date,
      initialFilters.records,
      initialFilters.page
    );
  }, []);

  return (
    <Fragment>
      <CaseTable
        filters={filters}
        setFilters={setFilters}
        search={handleClickSearch}
        next={handleClickNextPage}
        previous={handleClickPrevPage}
        isNextClick={isNextClick}
        isLoding={isLoading}
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon  disabled={filters.retail_id === "" || (filters.case_date === "" && filters.event_date === "")} iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon disabled={filters.retail_id === "" || (filters.case_date === "" && filters.event_date === "")} iconName="cloud_upload" loading={isLoading} onClick={handleExport}  />
      </FloatMenu>
    </Fragment>
  );
};

export default CasePage;
