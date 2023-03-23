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
import CaseFormRecordReception from "../../../components/functional/Case/CaseFormRecordReception";

const CaseStepPage = () => {
  const router = useRouter();
  const { setTitleUI, filters } = useUI();
  const { data, getBeneficiaryByRut } = useCase();
  const { case_id, stage } = router.query;

  const { data: thisCase }: any = useQuery(["case", `${case_id}`], {
    enabled: !!case_id,
  });

  const rut = thisCase?.rut;
  const number = thisCase?.case_number;

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
        ? `Registro de servicio | Caso ${number}`
        : stage === "contención"
        ? `Registro de servicio | Caso ${number}`
        : stage === "registro de servicio"
        ? `Recepción de antecedentes | Caso ${number}`
        : null
    );
  }, [router, thisCase]);

  return (
    <Fragment>
      <ContentHalfRow>
        {stage === "apertura" ? (
          <CaseFormService thisCase={thisCase} />
        ) : stage === "contención" ? (
          <CaseFormService thisCase={thisCase} />
        ) : stage === "registro de servicio" ? (
          <CaseFormRecordReception thisCase={thisCase} />
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
