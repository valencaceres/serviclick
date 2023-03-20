import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";

import { useUI } from "../../../hooks";
import CaseStageList from "../../../components/functional/_assistances/Case/CaseStageList";
import { ContentHalfRow } from "../../../components/layout/ResponsiveContent";
import CaseFormSupport from "../../../components/functional/_assistances/Case/CaseFormSupport";

const CaseStepPage = () => {
  const router = useRouter();
  const { setTitleUI, filters } = useUI();

  const { step: stage } = router.query;

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.back();
  };

  useEffect(() => {
    setTitleUI(
      stage === "new"
        ? `Nuevo caso`
        : stage === "support"
        ? `Contención`
        : stage === "recordReception"
        ? "Recepción antecedentes"
        : ""
    );
  }, [router]);

  return (
    <Fragment>
      <ContentHalfRow>
        {stage === "support" ? (
          <CaseFormSupport />
        ) : stage === "recordReception" ? (
          <CaseFormSupport />
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
