import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { ContentHalfRow } from "~/components/layout/ResponsiveContent";

import { FloatMenu, ButtonIcon, LoadingMessage } from "~/components/ui";

import { CaseHistory } from "~/components/functional/_assistances/Case";
import CaseChat from "~/components/functional/_assistances/Case/CaseChat";
import CaseStatus from "~/components/functional/_assistances/Case/CaseModalStatus";
import { stagePages } from "../../../../data/stages";

import { useDistrict, useUI } from "~/hooks";
import { useCase, useProcedure } from "~/store/hooks";
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
            caseValue?.case_id ? " N°" + caseNumber.toString() : ""
          } - Datos del beneficiario`
        ),
      save: () => saveApplicant(),
      next: () => router.push(`/assistance/case/${beneficiaryType}/${urlID}`),
      back: () => router.push(`/assistance/case`),
    },
    insured: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue?.case_id ? " N°" + caseNumber.toString() : ""
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
            caseValue?.case_id ? " N°" + caseNumber.toString() : ""
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
            caseValue?.type === "I" ? "applicant" : "insured"
          }/${caseValue?.case_id}`
        ),
    },
    event: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue?.case_id ? " N°" + caseNumber.toString() : ""
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
            caseValue?.case_id ? " N°" + caseNumber.toString() : ""
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
            caseValue?.case_id ? " N°" + caseNumber.toString() : ""
          } - Reembolso`
        ),
      save: () => saveStage(),
      next: () => router.push(`/assistance/case`),
      back: () =>
        router.push(`/assistance/case/attachment/${caseValue?.case_id}`),
    },
    imed: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue?.case_id ? " N°" + caseNumber.toString() : ""
          } - Devolución IMED`
        ),
      save: () => saveStage(),
      next: () => router.push(`/assistance/case`),
      back: () =>
        router.push(`/assistance/case/attachment/${caseValue?.case_id}`),
    },
    specialist: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue?.case_id ? " N°" + caseNumber.toString() : ""
          } - Envío de especialista`
        ),
      save: () => saveStage(),
      next: () => router.push(`/assistance/case`),
      back: () =>
        router.push(`/assistance/case/attachment/${caseValue?.case_id}`),
    },
    alliance: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue?.case_id ? " N°" + caseNumber.toString() : ""
          } - Designación de alianza`
        ),
      save: () => saveStage(),
      next: () => router.push(`/assistance/case`),
      back: () =>
        router.push(`/assistance/case/attachment/${caseValue?.case_id}`),
    },
    close: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue?.case_id ? " N°" + caseNumber.toString() : ""
          } - Caso cerrado`
        ),
      save: () => saveStage(),
      next: () => router.push(`/assistance/case`),
      back: () =>
        router.push(`/assistance/case/attachment/${caseValue?.case_id}`),
    },
    anulled_alliance: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue?.case_id ? " N°" + caseNumber.toString() : ""
          } - Designación de alianza (anulado)`
        ),
      save: () => saveStage(),
      next: () => router.push(`/assistance/case`),
      back: () =>
        router.push(`/assistance/case/attachment/${caseValue?.case_id}`),
    },
    anulled_specialist: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue?.case_id ? " N°" + caseNumber.toString() : ""
          } - Envio de especialista (anulado)`
        ),
      save: () => saveStage(),
      next: () => router.push(`/assistance/case`),
      back: () =>
        router.push(`/assistance/case/attachment/${caseValue?.case_id}`),
    },
  };

  const { setTitleUI } = useUI();
  const { listAllDistrict } = useDistrict();

  const {
    getById: getCaseById,
    upsert: caseUpsert,
    caseValue,
    upsertApplicant: applicantUpsert,
    applicant,
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
  const [openModalStatus, setIsOpenModalStatus] = useState<boolean>(false);
  const [caseNumber, setCaseNumber] = useState<string | number>("");
  const [beneficiaryType, setBeneficiaryType] = useState<string>("");
  const [applicantToUpdate, setApplicantToUpdate] = useState<string>("");
  const matchingProcedure = procedureList.find(
    (procedure) => procedure.id === caseValue?.procedure_id
  );
  const saveApplicant = () => {
    if (caseValue.type) {
      const isTypeC = caseValue.type === "C";
      const applicant =
        caseValue.type === "I"
          ? caseValue.insured
          : caseValue.type === "B"
          ? caseValue.beneficiary
          : isTypeC && !caseValue.insured.name
          ? caseValue.beneficiary
          : caseValue.insured;

      const caseType =
        caseValue.type === "I"
          ? "I"
          : caseValue.type === "B"
          ? "B"
          : isTypeC && !caseValue.insured.name
          ? "B"
          : "I";

      if (applicant) {
        applicantUpsert(caseType, applicant, caseValue, applicantToUpdate);
        stateMachine[stageKey].next();
      }
    }
  };

  const saveInsured = () => {
    applicantUpsert("I", caseValue.insured, caseValue, applicantToUpdate);
    if (window.location.href.includes("/insured/new")) {
      stateMachine[stageKey].next();
    }
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
  const setOpenModalStatus = () => setIsOpenModalStatus(true);
  const setClosedModalStatus = () => setIsOpenModalStatus(false);
  const setClosed = () => setShowModal(false);
  useEffect(() => {
    listAllDistrict();
    getAll();
    // stateMachine[stageKey].onLoad();
  }, []);
  /*  useEffect(() => {
    if (window.location.href.includes("/applicant/new") && applicant.id) {
      stateMachine[stageKey].next();
    }
  }, [applicant.id, router]); */

  useEffect(() => {
    setItWasFound(false);

    if (caseValue?.case_id !== null) {
      setItWasFound(true);
      setUrlID(caseValue?.case_id ?? null);

      if (isProcessing) {
        // setIsProcessing(false);
        stateMachine[stageKey].next();
      }
    }
  }, [caseValue]);

  useEffect(() => {
    stateMachine[stageKey].onLoad();
    if (router.query.id !== "new") {
      if (caseId?.case_number) {
        setCaseNumber(caseId.case_number);
      }
    }
  }, [stageKey, caseId, router.query.id]);
  useEffect(() => {
    if (caseValue?.type === "I") {
      setBeneficiaryType("product");
    } else if (caseValue?.type === "B") {
      setBeneficiaryType("insured");
    } else if (caseValue?.type === "C") {
      if (
        (caseValue?.insured && Object.keys(caseValue?.insured).length === 0) ||
        (caseValue?.insured && caseValue?.insured.name === "") ||
        caseValue?.insured === null
      ) {
        setBeneficiaryType("insured");
      } else if (
        (caseValue?.beneficiary &&
          Object.keys(caseValue?.beneficiary).length === 0) ||
        (caseValue?.beneficiary && caseValue?.beneficiary?.name === "") ||
        caseValue?.beneficiary === null
      ) {
        setBeneficiaryType("product");
      }
    }
  }, [caseValue?.type, caseValue?.insured, caseValue?.beneficiary]);

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
  }, [router, getCaseById]);

  return stagePages[stageKey] ? (
    <ContentHalfRow>
      {React.cloneElement(stagePages[stageKey].component, {
        setIsEnabledSave,
        itWasFound,
        setApplicantToUpdate,
      })}
      <CaseHistory setShowModal={setShowModal} showModal={showModal} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        {caseValue?.case_id !== null &&
          caseValue?.case_id !== "" &&
          (caseValue?.status?.isClosed === true ? (
            <ButtonIcon iconName="lock_open" onClick={setOpenModalStatus} />
          ) : (
            <ButtonIcon iconName="lock" onClick={setOpenModalStatus} />
          ))}
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon
          iconName="save"
          onClick={handleClickSave}
          disabled={!isEnabledSave || caseValue?.status?.isClosed === true}
        />
      </FloatMenu>
      {caseValue?.case_id !== null && caseValue?.case_id !== "" && (
        <>
          <Modal showModal={showModal}>
            <Window setClosed={setClosed}>
              <CaseChat thisCase={caseId} />
            </Window>
          </Modal>
          <Modal showModal={openModalStatus}>
            <Window setClosed={setClosedModalStatus}>
              <CaseStatus setIsOpen={setIsOpenModalStatus} thisCase={caseId} />
            </Window>
          </Modal>
        </>
      )}

      <LoadingMessage showModal={isLoadingCase} />
    </ContentHalfRow>
  ) : (
    <div>None</div>
  );
};

export default AssistanceCasePage;
