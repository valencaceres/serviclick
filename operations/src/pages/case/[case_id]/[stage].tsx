import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import { ContentHalfRow } from "../../../components/layout/ResponsiveContent";
import CaseFormService from "../../../components/functional/Case/CaseFormService";
import CaseStageList from "../../../components/functional/Case/CaseStageList";
import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";

import { useUI } from "../../../hooks";
import { useCase } from "../../../store/hooks/useCase";

const CaseStepPage = () => {
  const router = useRouter();
  const { setTitleUI, filters } = useUI();
  const { data, getBeneficiaryByRut } = useCase();
  const { case_id, stage } = router.query;

  const { data: thisCase }: any = useQuery(["case", `${case_id}`]);

  const rut = thisCase?.map((item: any) => item.rut);
  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.back();
  };

  useEffect(() => {
    getBeneficiaryByRut(rut);
  }, [thisCase]);

  useEffect(() => {
    setTitleUI(
      stage === "new"
        ? `Nuevo caso`
        : stage === "apertura"
        ? "Apertura"
        : stage === "contención"
        ? "Contención"
        : null
    );
  }, [router]);

  return (
    <Fragment>
      <ContentHalfRow>
        {stage === "apertura" ? (
          <CaseFormService />
        ) : stage === "contención" ? (
          <CaseFormService />
        ) : null}
        <CaseStageList />
      </ContentHalfRow>
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
      </FloatMenu>
    </Fragment>
  );
};

export default CaseStepPage;
