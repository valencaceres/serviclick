import { useEffect, Fragment, useState } from "react";
import { useRouter } from "next/router";

import FloatMenu from "~/components/ui/FloatMenu";
import ButtonIcon from "~/components/ui/ButtonIcon";

import CaseTable from "~/components/functional/_assistances/Case/CaseTable";

import { useUI } from "~/hooks";
import { useCase, useApplicant } from "~/store/hooks";

interface IFilters {
  retail_id: string;
  applicant_rut: string;
  applicant_name: string;
  stage_id: string;
  records: number;
  page: number;
}

const initialFilters: IFilters = {
  retail_id: "",
  applicant_rut: "",
  applicant_name: "",
  stage_id: "",
  records: 20,
  page: 1,
};

const CasePage = () => {
  const router = useRouter();

  const { reset: resetApplicant } = useApplicant();
  const { getAll, caseList, reset: resetCase } = useCase();

  const { setTitleUI } = useUI();

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
      filters.applicant_rut,
      filters.applicant_name,
      filters.stage_id,
      filters.records,
      1
    );
  };

  const handleClickNextPage = () => {
    if ((filters?.page || 1) === caseList.pagination.total) return;
    setFilters({ ...filters, page: filters.page + 1 });
    getAll(
      filters.retail_id,
      filters.applicant_rut,
      filters.applicant_name,
      filters.stage_id,
      filters.records,
      filters.page + 1
    );
  };

  const handleClickPrevPage = () => {
    if ((filters?.page || 1) === 1) return;
    setFilters({ ...filters, page: filters.page - 1 });
    getAll(
      filters.retail_id,
      filters.applicant_rut,
      filters.applicant_name,
      filters.stage_id,
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
      initialFilters.applicant_rut,
      initialFilters.applicant_name,
      initialFilters.stage_id,
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
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default CasePage;
