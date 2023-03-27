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
import CaseFormEvaluation from "../../../components/functional/Case/CaseFormEvaluation";
import CaseFormNew from "../../../components/functional/Case/CaseFormNew";
import CaseFormPartner from "../../../components/functional/Case/CaseFormPartner";
import CaseFormSpecialist from "../../../components/functional/Case/CaseFormSpecialist";

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
    router.push("/case");
  };

  useEffect(() => {
    getBeneficiaryByRut(rut);
  }, [thisCase]);

  useEffect(() => {
    setTitleUI(
      stage === "new"
        ? `Nuevo caso`
        : stage === "apertura"
        ? `Apertura | Caso ${number}`
        : stage === "contención"
        ? `Contención | Caso ${number}`
        : stage === "registro de servicio"
        ? `Registro de servicio | Caso ${number}`
        : stage === "recepción de antecedentes"
        ? `Recepción de antecedentes | Caso ${number}`
        : stage === "evaluación del evento"
        ? `Evaluación | Caso ${number}`
        : stage === "designación de convenio"
        ? `Designación de convenio | Caso ${number}`
        : stage === "designación de especialista"
        ? `Designación de especialista | Caso ${number}`
        : null
    );
  }, [router, thisCase]);

  return (
    <Fragment>
      <ContentHalfRow>
        {stage === "apertura" ? (
          <CaseFormNew thisCase={thisCase} />
        ) : stage === "contención" ? (
          <CaseFormNew thisCase={thisCase} />
        ) : stage === "registro de servicio" ? (
          <CaseFormService thisCase={thisCase} />
        ) : stage === "recepción de antecedentes" ? (
          <CaseFormRecordReception thisCase={thisCase} />
        ) : stage === "evaluación del evento" ? (
          <CaseFormEvaluation thisCase={thisCase} />
        ) : stage === "designación de convenio" ? (
          <CaseFormPartner thisCase={thisCase} />
        ) : stage === "designación de especialista" ? (
          <CaseFormSpecialist thisCase={thisCase} />
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
