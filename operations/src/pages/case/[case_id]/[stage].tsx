import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import { ContentHalfRow } from "../../../components/layout/ResponsiveContent";
import CaseFormService from "../../../components/functional/Case/CaseFormService";
import CaseStageList from "../../../components/functional/Case/CaseStageList";
import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";

import { useUI } from "../../../hooks";

const CaseStepPage = () => {
  const router = useRouter();
  const { setTitleUI, filters } = useUI();

  const { stage } = router.query;

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
        {stage === "apertura" ? <CaseFormService /> : null}
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
