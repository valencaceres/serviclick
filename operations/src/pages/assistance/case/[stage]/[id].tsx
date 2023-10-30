import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { ContentHalfRow } from "~/components/layout/ResponsiveContent";

import { FloatMenu, ButtonIcon, LoadingMessage } from "~/components/ui";

import { CaseHistory } from "~/components/functional/_assistances/Case";

import { stagePages } from "../../../../data/stages";

import { useDistrict, useUI } from "~/hooks";
import { useCase, useApplicant } from "~/store/hooks";

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
          } - datos del beneficiario`
        ),
      save: () => SaveApplicant(),
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
          } - datos del titular`
        ),
      save: () => SaveInsured(),
      next: () => router.push(`/assistance/case/product/${urlID}`),
      back: () => router.push(`/assistance/case/applicant/${urlID}`),
    },
    product: {
      onLoad: () =>
        setTitleUI(
          `Caso${
            caseValue.case_id ? " N°" + caseValue.case_number.toString() : ""
          } - datos del servicio`
        ),
      save: () => SaveProduct(),
      next: () => router.push(`/assistance/case/event/${urlID}`),
      back: () =>
        router.push(
          `/assistance/case/${
            caseValue.type === "I" ? "applicant" : "insured"
          }/${urlID}`
        ),
    },
    event: {
      onLoad: () => {},
      save: () => {},
      next: () => {},
      back: () => router.push(`/assistance/case/product/${urlID}`),
    },
  };

  const { setTitleUI } = useUI();
  const { listAllDistrict } = useDistrict();
  const { upsert: applicantUpsert, isLoading: isLoadingApplicant } =
    useApplicant();
  const {
    getById: getCaseById,
    upsert: caseUpsert,
    caseValue,
    isLoading: isLoadingCase,
  } = useCase();

  const [isEnabledSave, setIsEnabledSave] = useState<boolean>(false);
  const [urlID, setUrlID] = useState<string>("new");
  const [itWasFound, setItWasFound] = useState(false);
  const [stageKey, setStageKey] = useState<Stage>("applicant");

  const SaveApplicant = () => {
    if (caseValue) {
      const applicant =
        caseValue?.type === "I" ? caseValue.insured : caseValue.beneficiary;
      if (applicant) {
        applicantUpsert(caseValue?.type, applicant);
      }
    }
  };

  const SaveInsured = () => {
    applicantUpsert("I", caseValue.insured);
  };

  const SaveProduct = () => {
    console.log(caseValue);
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
    stateMachine[stageKey].next();
  };

  useEffect(() => {
    listAllDistrict();
    // stateMachine[stageKey].onLoad();
  }, []);

  useEffect(() => {
    setItWasFound(false);
    if (caseValue.case_id !== "") {
      setItWasFound(true);
    }
  }, [caseValue]);

  useEffect(() => {
    if (router.isReady) {
      const { id, stage } = router.query;
      if (id) {
        setUrlID(id.toString());
        if (id.toString() !== "new") {
          getCaseById(id.toString());
        }
      }
      setStageKey(stage as Stage);
      stateMachine[stageKey].onLoad();
    }
  }, [router]);

  return stagePages[stageKey] ? (
    <ContentHalfRow>
      {React.cloneElement(stagePages[stageKey].component, {
        setIsEnabledSave,
        itWasFound,
      })}
      <CaseHistory />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon
          iconName="save"
          onClick={handleClickSave}
          disabled={!isEnabledSave}
        />
      </FloatMenu>
      <LoadingMessage showModal={isLoadingApplicant || isLoadingCase} />
    </ContentHalfRow>
  ) : (
    <div>None</div>
  );
};

export default AssistanceCasePage;
