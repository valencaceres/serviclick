import { useEffect, Fragment, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import { ContentHalfRow } from "~/components/layout/ResponsiveContent";
import CaseFormService from "~/components/functional/Case/CaseFormService";
import CaseStageList from "~/components/functional/Case/CaseStageList";
import FloatMenu from "~/components/ui/FloatMenu";
import ButtonIcon from "~/components/ui/ButtonIcon";

import { useUI } from "~/hooks";
import { useCase } from "~/store/hooks/useCase";
import CaseFormRecordReception from "~/components/functional/Case/CaseFormRecordReception";
import CaseFormEvaluation from "~/components/functional/Case/CaseFormEvaluation";
import CaseFormNew from "~/components/functional/Case/CaseFormNew";
import CaseFormPartner from "~/components/functional/Case/CaseFormPartner";
import CaseFormSpecialist from "~/components/functional/Case/CaseFormSpecialist";
import CaseTracking from "~/components/functional/Case/CaseTracking";
import CaseFormResolution from "~/components/functional/Case/CaseFormResolution";
import CaseFormSolution from "~/components/functional/Case/CaseFormSolution";
import CaseRating from "~/components/functional/Case/CaseRating";
import CaseFormRejected from "~/components/functional/Case/CaseFormRejected";
import { ContentCell } from "~/components/layout/Content";
import CaseNotes from "~/components/functional/Case/CaseChat";
import { Modal, Window } from "~/components/ui/Modal";
import { useQueryCase } from "~/hooks/query";

const CaseStepPage = () => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const { setTitleUI } = useUI();
  const { case_id, stage } = router.query;

  const { data: thisCase }: any = useQuery(["case", `${case_id}`], {
    enabled: !!case_id,
  });

  const number = thisCase?.case_number;

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.push("/case");
  };

  const setClosed = () => {
    setShowModal(false);
  };

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
        : stage === "solución particular"
        ? `Solución particular | Caso ${number}`
        : stage === "designación de convenio"
        ? `Designación de convenio | Caso ${number}`
        : stage === "designación de especialista"
        ? `Designación de especialista | Caso ${number}`
        : stage === "solución particular"
        ? `Solución particular | Caso ${number}`
        : stage === "seguimiento"
        ? `Seguimiento | Caso ${number}`
        : stage === "resolución"
        ? `Resolución | Caso ${number}`
        : stage === "calificación"
        ? `Calificación | Caso ${number}`
        : stage === "rechazado"
        ? `Rechazado | Caso ${number}`
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
        ) : stage === "solución particular" ? (
          <CaseFormSolution thisCase={thisCase} />
        ) : stage === "designación de convenio" ? (
          <CaseFormPartner thisCase={thisCase} />
        ) : stage === "designación de especialista" ? (
          <CaseFormSpecialist thisCase={thisCase} />
        ) : stage === "seguimiento" ? (
          <CaseTracking thisCase={thisCase} />
        ) : stage === "resolución" ? (
          <CaseFormResolution thisCase={thisCase} />
        ) : stage === "calificación" ? (
          <CaseRating thisCase={thisCase} />
        ) : stage === "rechazado" ? (
          <CaseFormRejected thisCase={thisCase} />
        ) : null}
        <ContentCell gap="20px">
          <CaseStageList setShowModal={setShowModal} showModal={showModal} />
        </ContentCell>
      </ContentHalfRow>
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
      </FloatMenu>
      <Modal showModal={showModal}>
        <Window setClosed={setClosed}>
          <CaseNotes thisCase={thisCase} />
        </Window>
      </Modal>
    </Fragment>
  );
};

export default CaseStepPage;
