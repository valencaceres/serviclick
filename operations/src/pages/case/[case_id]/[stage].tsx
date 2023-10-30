import { useEffect, Fragment, useState } from "react";
import { useRouter } from "next/router";

import { ContentHalfRow } from "~/components/layout/ResponsiveContent";
import CaseFormService from "~/components/functional/Case/CaseFormService";
import CaseStageList from "~/components/functional/Case/CaseStageList";
import FloatMenu from "~/components/ui/FloatMenu";
import ButtonIcon from "~/components/ui/ButtonIcon";

import { useUI } from "~/hooks";
import CaseFormRecordReception from "~/components/functional/Case/CaseFormRecordReception";
import CaseFormEvaluation from "~/components/functional/Case/CaseFormEvaluation";
import ApplicantFormNew from "~/components/functional/Case/CaseFormNew";
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
import CaseFormInsuredData from "~/components/functional/Case/CaseFormInsuredData";
import CaseFormIMED from "~/components/functional/Case/CaseFormIMED";

const stageComponents = {
  apertura: ApplicantFormNew,
  contención: ApplicantFormNew,
  "datos titular": CaseFormInsuredData,
  "registro de servicio": CaseFormService,
  "recepción de antecedentes": CaseFormRecordReception,
  "evaluación del evento": CaseFormEvaluation,
  "solicitud reembolso": CaseFormSolution,
  "designación de alianza": CaseFormPartner,
  "designación de especialista": CaseFormSpecialist,
  "descuento imed": CaseFormIMED,
  seguimiento: CaseTracking,
  resolución: CaseFormResolution,
  calificación: CaseRating,
  rechazado: CaseFormRejected,
};

const stageNames = {
  new: "Nuevo caso",
  apertura: "Apertura",
  contención: "Contención",
  "datos titular": "Datos titular",
  "registro de servicio": "Registro de servicio",
  "recepción de antecedentes": "Recepción de antecedentes",
  "evaluación del evento": "Evaluación",
  "solicitud reembolso": "Solicitud reembolso",
  "descuento imed": "Descuento IMED",
  "designación de alianza": "Designación de alianza",
  "designación de especialista": "Designación de especialista",
  seguimiento: "Seguimiento",
  resolución: "Resolución",
  calificación: "Calificación",
  rechazado: "Rechazado",
};

type StageKeys = keyof typeof stageComponents;

const CaseStepPage = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { setTitleUI } = useUI();
  const case_id = Array.isArray(router.query.case_id)
    ? router.query.case_id[0]
    : router.query.case_id;

  const stage = (
    Array.isArray(router.query.stage)
      ? router.query.stage[0]
      : router.query.stage
  ) as StageKeys | undefined;
  // const { data: thisCase, isLoading } = useQueryCase().useGetById(
  //   case_id as string
  // );
  // const number = thisCase?.case_number;
  const StageComponent = stage ? stageComponents[stage] : null;

  const handleClickHome = () => router.push("/");
  const handleClickBack = () => router.push("/case");
  const handleClickSave = () => router.push("/case");

  const setClosed = () => setShowModal(false);

  // useEffect(() => {
  //   if (stage) {
  //     setTitleUI(
  //       `${
  //         isLoading
  //           ? "Cargando..."
  //           : `${stageNames[stage]} | Caso ${number ?? stageNames[stage]}`
  //       }`
  //     );
  //   }
  // }, [router, thisCase, stage]);

  return (
    <Fragment>
      <ContentHalfRow>
        {/* {StageComponent && <StageComponent thisCase={thisCase} />} */}
        <ContentCell gap="20px">
          <CaseStageList setShowModal={setShowModal} showModal={showModal} />
        </ContentCell>
      </ContentHalfRow>
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon
          iconName="save"
          onClick={() => {
            handleClickSave();
          }}
        />
      </FloatMenu>
      <Modal showModal={showModal}>
        <Window setClosed={setClosed}>
          {/* <CaseNotes thisCase={thisCase} /> */}
        </Window>
      </Modal>
    </Fragment>
  );
};

export default CaseStepPage;
