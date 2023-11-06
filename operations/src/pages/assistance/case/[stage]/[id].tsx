import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { ContentHalfRow } from "~/components/layout/ResponsiveContent";

import { FloatMenu, ButtonIcon, LoadingMessage } from "~/components/ui";

import { CaseHistory } from "~/components/functional/_assistances/Case";
import CaseChat from "~/components/functional/_assistances/Case/CaseChat";

import { stagePages } from "../../../../data/stages";

import { useDistrict, useUI } from "~/hooks";
import { useCase, useApplicant, useProcedure } from "~/store/hooks";
import { Modal, Window } from "~/components/ui/Modal";
type Stage = keyof typeof stagePages;

const AssistanceCasePage = () => {
  const router = useRouter();

  interface IStateMachine {
    [key: string]: {
      save: () => void;
      next: () => void;
      back: () => void;
    };
  }

  const stateMachine = {
    applicant: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue.case_id ? " N°" + caseValue.case_number.toString() : ""
          } - Datos del beneficiario`
        ),
      save: () => saveApplicant(),
      next: () =>
        router.push(
          `/assistance/case/${
            caseValue.type === "I" ? "product" : "insured"
          }/${urlID}`
        ),
      back: () => router.push(`/assistance/case`),
    },
    insured: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue.case_id ? " N°" + caseValue.case_number.toString() : ""
          } - Datos del titular`
        ),
      save: () => saveInsured(),
      next: () =>
        router.push(`/assistance/case/product/${caseValue?.case_id ?? "new"}`),
      back: () =>
        router.push(
          `/assistance/case/applicant/${caseValue?.case_id ?? "new"}`
        ),
    },
    product: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue.case_id ? " N°" + caseValue.case_number.toString() : ""
          } - Datos del servicio`
        ),
      save: () => {
        saveProduct();
      },
      next: () => {
        if (caseValue?.case_id) {
          router.push(`/assistance/case/event/${caseValue?.case_id}`);
        }
      },
      back: () =>
        router.push(
          `/assistance/case/${
            caseValue.type === "I" ? "applicant" : "insured"
          }/${caseValue?.case_id}`
        ),
    },
    event: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue.case_id ? " N°" + caseValue.case_number.toString() : ""
          } - Datos del evento`
        ),
      save: () => saveStage(),
      next: () =>
        router.push(`/assistance/case/attachment/${caseValue?.case_id}`),
      back: () => router.push(`/assistance/case/product/${caseValue?.case_id}`),
    },
    attachment: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue.case_id ? " N°" + caseValue.case_number.toString() : ""
          } - Antecedentes (adjuntos)`
        ),
      save: () => saveStage(),
      next: () =>
        router.push(
          `/assistance/case/${matchingProcedure?.code}/${caseValue?.case_id}`
        ),
      back: () => router.push(`/assistance/case/event/${caseValue.case_id}`),
    },
    refund: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue.case_id ? " N°" + caseValue.case_number.toString() : ""
          } - Reembolso`
        ),
      save: () => saveStage(),
      next: () => router.push(`/assistance/case`),
      back: () =>
        router.push(`/assistance/case/attachment/${caseValue.case_id}`),
    },
    imed: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue.case_id ? " N°" + caseValue.case_number.toString() : ""
          } - Devolución IMED`
        ),
      save: () => saveStage(),
      next: () => router.push(`/assistance/case`),
      back: () =>
        router.push(`/assistance/case/attachment/${caseValue.case_id}`),
    },
    specialist: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue.case_id ? " N°" + caseValue.case_number.toString() : ""
          } - Envío de especialista`
        ),
      save: () => saveStage(),
      next: () => router.push(`/assistance/case`),
      back: () =>
        router.push(`/assistance/case/attachment/${caseValue.case_id}`),
    },
    alliance: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue.case_id ? " N°" + caseValue.case_number.toString() : ""
          } - Designación de alianza`
        ),
      save: () => saveStage(),
      next: () => router.push(`/assistance/case`),
      back: () =>
        router.push(`/assistance/case/attachment/${caseValue.case_id}`),
    },
  };

  const { setTitleUI } = useUI();
  const { listAllDistrict } = useDistrict();
  const {
    upsert: applicantUpsert,
    isLoading: isLoadingApplicant,
    applicant,
  } = useApplicant();
  const {
    getById: getCaseById,
    upsert: caseUpsert,
    caseValue,
    isLoading: isLoadingCase,
    caseId,
  } = useCase();
  const { getAll, procedureList } = useProcedure();

  const [isEnabledSave, setIsEnabledSave] = useState<boolean>(false);
  const [urlID, setUrlID] = useState<string | null>(null);
  const [itWasFound, setItWasFound] = useState(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [stageKey, setStageKey] = useState<Stage>("applicant");
  const [showModal, setShowModal] = useState(false);

  const matchingProcedure = procedureList.find(
    (procedure) => procedure.id === caseValue.procedure_id
  );

  const saveApplicant = () => {
    if (caseValue.type) {
      const applicant =
        caseValue?.type === "I" ? caseValue.insured : caseValue.beneficiary;
      if (applicant) {
        applicantUpsert(caseValue?.type, applicant);
      }
    }
  };

  const saveInsured = () => {
    applicantUpsert("I", caseValue.insured);
  };

  const saveProduct = async () => {
    setIsProcessing(true);
    caseUpsert(caseValue);
  };

  const saveStage = () => {
    setIsProcessing(true);
    caseUpsert(caseValue);
  };

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    stateMachine[stageKey].back();
  };

  const handleClickSave = () => {
    stateMachine[stageKey].save();
    //stateMachine[stageKey].next();
  };

  const setClosed = () => setShowModal(false);

  useEffect(() => {
    listAllDistrict();
    getAll();
    // stateMachine[stageKey].onLoad();
  }, []);

  useEffect(() => {
    if (applicant.id) {
      stateMachine[stageKey].next();
    }
  }, [applicant]);

  useEffect(() => {
    setItWasFound(false);

    if (caseValue.case_id !== null) {
      setItWasFound(true);
      setUrlID(caseValue.case_id ?? null);

      if (isProcessing) {
        // setIsProcessing(false);
        stateMachine[stageKey].next();
      }
    }
  }, [caseValue]);

  useEffect(() => {
    stateMachine[stageKey].onLoad();
  }, [stageKey]);

  useEffect(() => {
    setIsProcessing(false);
    if (router.isReady) {
      const { id, stage } = router.query;

      if (id) {
        setUrlID(id.toString());
        if (id.toString() !== "new") {
          getCaseById(id.toString());
        }
        stateMachine[stageKey].onLoad();
      }
      setStageKey(stage as Stage);
    }
  }, [router]);

  return stagePages[stageKey] ? (
    <ContentHalfRow>
      {React.cloneElement(stagePages[stageKey].component, {
        setIsEnabledSave,
        itWasFound,
      })}
      <CaseHistory setShowModal={setShowModal} showModal={showModal} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon
          iconName="save"
          onClick={handleClickSave}
          disabled={!isEnabledSave}
        />
      </FloatMenu>
      <Modal showModal={showModal}>
        <Window setClosed={setClosed}>
          <CaseChat thisCase={caseId} />
        </Window>
      </Modal>
      <LoadingMessage showModal={isLoadingApplicant || isLoadingCase} />
    </ContentHalfRow>
  ) : (
    <div>None</div>
  );
};

export default AssistanceCasePage;
