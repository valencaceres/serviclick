import { useEffect, Fragment, useState } from "react";
import { useRouter } from "next/router";

import FloatMenu from "~/components/ui/FloatMenu";
import ButtonIcon from "~/components/ui/ButtonIcon";

import CaseTable from "~/components/functional/_assistances/Case/CaseTable";

import { useUI } from "~/hooks";
import { useCase, useApplicant } from "~/store/hooks";

const CasePage = () => {
  const router = useRouter();

  const { reset: resetApplicant } = useApplicant();
  const { getAll, caseList, reset: resetCase } = useCase();

  const { setTitleUI, filters } = useUI();

  const [selectedRetailValue, setSelectedRetailValue] = useState("");
  const [selectedStageValue, setSelectedStageValue] = useState("");
  const [inputRut, setInputRut] = useState("");
  const [inputText, setInputText] = useState();
  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    getAll(
      selectedRetailValue,
      inputRut ? inputRut : "",
      inputText ? inputText : "",
      selectedStageValue
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
    getAll("", "", "", "");
  }, []);

  return (
    <Fragment>
      <CaseTable
        caseList={caseList}
        selectedStageValue={selectedStageValue}
        selectedRetailValue={selectedRetailValue}
        setSelectedStageValue={setSelectedStageValue}
        setSelectedRetailValue={setSelectedRetailValue}
        setInputText={setInputText}
        inputText={inputText}
        setInputRut={setInputRut}
        inputRut={inputRut}
        handleClickRefresh={handleClickRefresh}
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
